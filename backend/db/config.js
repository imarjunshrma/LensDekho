const mongoose = require("mongoose");
const url =
  "mongodb+srv://arjunsharma12ka4:LwlmjEoCAHHrYwfp@cluster0.2w8hlz2.mongodb.net/LensDekho";
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
