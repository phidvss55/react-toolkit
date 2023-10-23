import express from "express";
import http from "http";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import bodyParser from "body-parser";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import fakeData from "./fakeData/index.js";
import connectToDatabase from "./database/config.js";
import "dotenv/config.js";

const app = express();
const httpServer = http.createServer(app);

import { resolvers } from "./resolvers/index.js";
import { typeDefs } from "./schemas/index.js";

// schema
// resolver
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use(cors(), bodyParser.json(), expressMiddleware(server));
connectToDatabase();

const PORT = process.env.PORT || 4000;
await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));

console.log("Server is ready at http://localhost:4000");
