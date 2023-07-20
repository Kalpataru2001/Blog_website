const express = require('express');
const dotenv = require('dotenv');
const app = express();
const cors = require('cors');
const multer = require('multer');
const morgan = require('morgan');
const authRoutes = require('./routes/auth');
const postsRoutes = require('./routes/posts');
const usersRoutes = require('./routes/users');
const connectDB = require('./config/db');
dotenv.config();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

connectDB();

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/blogs', postsRoutes);

app.listen(port, () =>
  console.log(`Server started on http://localhost:${port}`)
);
