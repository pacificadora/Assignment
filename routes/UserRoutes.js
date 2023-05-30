const express = require("express");
const router = express.Router();

const {
  login,
  signUp,
  updateProfile,
} = require("../controllers/UserController");

const { auth } = require("../middlewares/auth");

router.post("/login", login);
router.post("/signup", signUp);
router.patch("/users/:userId", updateProfile);

module.exports = router;
