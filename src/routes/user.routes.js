const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");
const auth = require("../middleware/auth");
const upload = require("../helpers/upload");

router.put(
  "/profile",
  auth,
  upload.single("profil"),
  UserController.updateProfile
);
router.get("/profile", auth, UserController.get);
router.get("/leaderboard", auth, UserController.getAllUsersOrderedByPoints);

module.exports = router;
