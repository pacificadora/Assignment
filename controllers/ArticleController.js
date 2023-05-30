const ArticleModel = require("../models/ArticleModel");
const UserModel = require("../models/UserModel");

//post article
exports.createArticle = async (req, res) => {
  try {
    const { description, title } = req.body;
    const userId = req.params.userId;
    console.log(userId, description, title);
    if (!description || !title) {
      return res.status(400).json({
        success: false,
        message: "Please enter all the details",
      });
    }
    const userDetails = await UserModel.findOne({ _id: userId });
    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "no user present with the given userId",
      });
    }
    const article = await ArticleModel.create({
      title: title,
      description: description,
      author: userDetails._id,
    });
    return res.status(201).json({
      success: true,
      message: "article created successfully",
      data: article,
    });
  } catch (error) {
    console.log(error);
    return res.status(502).json({
      success: false,
      message: "article cannot be created, please try again",
      error: error.message,
    });
  }
};

//get all articles
exports.getAllArticles = async (req, res) => {
  try {
    const allArticles = await ArticleModel.find({}).populate("author");
    if (allArticles.length === 0) {
      return res.status(404).json({
        success: false,
        message: "no article is present, create one",
      });
    }
    return res.status(201).json({
      success: true,
      message: "these are all the articles!",
      data: allArticles,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "cannot return the articles, server error",
      error: error.message,
    });
  }
};
