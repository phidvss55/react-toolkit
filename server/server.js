const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = require('./config/db');
connectDB();

const PORT = process.env.PORT || 4000;

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/users', require('./routes/userRoutes'))
// app.use('/api/goals', require('./routes/goalRoutes'))

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

