const express = require("express");
const router = express.Router();

const {
  getAllArticles,
  createArticle,
} = require("../controllers/ArticleController");

const { auth } = require("../middlewares/auth");

router.post("/users/:userId/articles", auth, createArticle);
router.get("/articles", auth, getAllArticles);

module.exports = router;
