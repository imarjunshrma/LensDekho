const { Products } = require("../models");
const data = require("../products/Products");

const addAllData = async (req, res) => {
  try {
    const existingData = await Products.find({});

    if (existingData.length > 0) {
      return res
        .status(400)
        .json({ msg: "Data is already present", status: false });
    }

    await Products.create(data);
    return res.status(200).send("Data added successfully");
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ msg: "Internal Server Error", status: false });
  }
};

module.exports = addAllData;
