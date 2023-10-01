const express = require("express");
const path = require("path");
const app = express();
const connectDB = require("./db/config");
const router = require("./view/index");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 3006;
connectDB();
app.use(express.json());
app.use(cors());
app.use("/", router);
app.use(express.urlencoded({ extended: false }));

app.use("/img", express.static(path.join(__dirname, "./img")));
app.listen(PORT, () => {
  console.log("server running ");
});
