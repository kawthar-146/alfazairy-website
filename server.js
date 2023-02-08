const express = require('express');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const connectDB = require('./config/db');
const path = require('path');

const app = express();
app.use(cors());

// Connect Database
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/uploads/images', express.static('uploads/images'));

app.use('/api/collections', require('./routes/collectionsRoutes'));
app.use('/api/categories', require('./routes/categoriesRoutes'));
app.use('/api/dresses', require('./routes/dressesRoutes'));
app.use('/api/admin', require('./routes/userRoutes'));

app.use(errorHandler);

if (process.env.NODE_ENV === 'production') {
  //Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
