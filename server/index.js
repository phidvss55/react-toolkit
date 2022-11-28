import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser'

dotenv.config();

import {connectToDB} from './config/db.js'
import {default as authRoutes} from './routes/auth.js';
import {default as hotelRoutes} from './routes/hotels.js';
import {default as userRoutes} from './routes/users.js';
import {default as roomRoutes} from './routes/rooms.js';

const app = express();
connectToDB()

// middlewares
app.use(cors())
app.use(cookieParser())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/hotels', hotelRoutes)
app.use("/api/rooms", roomRoutes);
app.use("/api/users", userRoutes);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMsg = err.message || 'Something went wrong'

  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMsg,
    stack: err.stack,
  });
})
 
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`)
})