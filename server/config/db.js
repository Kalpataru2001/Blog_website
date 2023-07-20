const { mongoose } = require('mongoose');

const connectDB = async () => {
  try {
    const db = await mongoose.connect('mongodb://127.0.0.1:27017/myapp', {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    if (db) console.log('Database connected!');
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
