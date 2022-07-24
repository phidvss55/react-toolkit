const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const path = require('path');
const colors = require('colors');
const { errorHandler } = require('./middleware/errorMiddleware');

const connectDB = require('./config/db');
connectDB();

const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/goals', require('./routes/goalRoutes'))


// Serve frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'client', 'build', 'index.html')
    )
  );
} else {
  app.get('/', (req, res) => res.send('Please set to production'));
}

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

