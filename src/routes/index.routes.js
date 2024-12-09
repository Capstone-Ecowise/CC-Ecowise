const express = require("express");
const router = express.Router();

const AuthRoutes = require("../routes/auth.routes");
const UserRoutes = require("../routes/user.routes");
const PredictRoutes = require("../routes/prediction.routes");

router.use("/auth", AuthRoutes);
router.use("/user", UserRoutes);
router.use("/predict", PredictRoutes);

module.exports = router;
