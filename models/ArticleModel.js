const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "UserModel",
    required: true,
  },
});

module.exports = mongoose.model("ArticleModel", articleSchema);
