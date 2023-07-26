const { Products } = require("../models");

const getLensesData = async (req, res) => {
  try {
    const response = await Products.find({});
    const baseUrl = `${req.protocol}://${req.hostname}:${req.socket.localPort}`;
    for (let resp of response) {
      resp.image = baseUrl + resp.image;
    }
    return res.status(200).json({ msg: response, success: true });
  } catch (err) {
    return res.status(500).json({ msg: err, success: false });
  }
};
const getLensesDataById = async (req, res) => {
  const id = req.params.id;
  try {
    const response = await Products.find({ _id: id });
    if (!response.length) {
      return res.status(200).json({ msg: [], success: false });
    }
    const baseUrl = `${req.protocol}://${req.hostname}:${req.socket.localPort}`;
    for (let resp of response) {
      resp.image = baseUrl + resp.image;
    }
    return res.status(200).json({ response, success: true });
  } catch (err) {
    return res.status(500).json({ msg: err, success: false });
  }
};

const getLensesDataByFilter = async (req, res) => {
  const { category, gender, rating, price } = req.query;
  let filter = {};

  if (category) {
    filter.category = category;
  }
  if (gender) {
    if (!gender === "All") {
      filter.gender = gender;
    }
  }
  if (rating) {
    filter.rating = { $gte: Number(rating) };
  }
  if (price) {
    let minPrice = 0;
    let maxPrice = 0;
    if (parseInt(price) < 2499) {
      maxPrice = 2499;
      minPrice = parseInt(price);
    } else {
      minPrice = 2499;
      maxPrice = parseInt(price);
    }
    filter.price = { $gte: Number(minPrice), $lte: Number(maxPrice) };
  }

  try {
    const response = await Products.find(filter);

    if (!response.length) {
      return res.status(200).json({ msg: [], success: false });
    }

    const baseUrl = `${req.protocol}://${req.hostname}:${req.socket.localPort}`;
    for (let resp of response) {
      resp.image = baseUrl + resp.image;
    }

    return res.status(200).json({ msg: response, success: true });
  } catch (err) {
    return res.status(500).json({ msg: err, success: false });
  }
};

const addDataIntoDatabase = async (req, res) => {
  const body = req.body;
  try {
    const product = new Products(body);
    await product.save();
    return res
      .status(201)
      .json({ msg: "Product Add Successful", success: true });
  } catch (err) {
    return res.status(500).json({ msg: err, success: false });
  }
};
module.exports = {
  getLensesData,
  addDataIntoDatabase,
  getLensesDataById,
  getLensesDataByFilter,
};
