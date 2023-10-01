const mongoose = require("mongoose");
require("dotenv").config();
const url = process.env.DB_USER;
const connectDB = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (err) {
    console.log(err);
  }
};
module.exports = connectDB;

// LwlmjEoCAHHrYwfp
