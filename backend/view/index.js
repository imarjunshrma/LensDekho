//

const express = require("express");
const {
  getLensesData,
  addDataIntoDatabase,
  getLensesDataById,
  getLensesDataByFilter,
  getLensesDataBySearch,
} = require("../controllers");
const addAllData = require("../controllers/admin");
const router = express.Router();
router.route("/addData").post(addDataIntoDatabase);
// router.route("/lens").get(getLensesData);
router.route("/lens/search").get(getLensesDataBySearch)
router.route("/lens/:id").get(getLensesDataById);
router.route("/lens").get(getLensesDataByFilter);
router.route("/addAllData").post(addAllData);
module.exports = router;
