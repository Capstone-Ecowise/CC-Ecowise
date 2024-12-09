const express = require("express");
const router = express.Router();
const PredictionController = require("../controllers/prediction.controller");
const upload = require("../helpers/upload");
const authOptional = require("../middleware/authOptional");

router.post(
  "/prediction",
  upload.single("image"),
  authOptional,
  PredictionController.predict
);

module.exports = router;
