import express from "express";
import http from "http";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import bodyParser from "body-parser";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import connectToDatabase from "./database/config.js";

const app = express();
const httpServer = http.createServer(app);

import { resolvers } from "./resolvers/index.js";
import { typeDefs } from "./schemas/index.js";
import "./firebase/config.js";
import { getAuth } from "firebase-admin/auth";
import "dotenv/config.js";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { useServer } from "graphql-ws/lib/use/ws";
import { WebSocketServer } from "ws";

const schema = makeExecutableSchema({ typeDefs, resolvers });

// Creating the WebSocket server
const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/graphql",
});

const serverCleanup = useServer({ schema }, wsServer);

// schema
// resolver
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose(); // I have no idea why this shit works
          },
        };
      },
    },
  ],
});

await server.start();

const authorizationJWT = async (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    const accessToken = authorization.split(" ")[1];
    getAuth()
      .verifyIdToken(accessToken)
      .then((decoded) => {
        res.locals.uid = decoded.uid;
        next();
      })
      .catch((err) => {
        console.log("Middleware error", err);
        return res.status(403).json({ message: "Forbidden", error: err });
      });
  } else {
    // return res.status(401).json({ message: "Unauthentication" });
    next();
  }
};

app.use(
  cors(),
  authorizationJWT,
  bodyParser.json(),
  expressMiddleware(server, {
    context: async ({ req, res }) => {
      return { uid: res.locals.uid };
    },
  })
);
connectToDatabase();

const PORT = process.env.PORT || 4000;
await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
console.log("Server is ready at http://localhost:4000");
