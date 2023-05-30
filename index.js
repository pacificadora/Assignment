const express = require("express");
const app = express();

const userRoutes = require("./routes/UserRoutes");
const articleRoutes = require("./routes/articleRoutes");

const database = require("./config/database");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

dotenv.config();
const port = process.env.PORT || 4000;

//db connect
database();

app.use(express.json());
app.use(cookieParser());

app.use("/api", userRoutes);
app.use("/api", articleRoutes);

app.use("/", (req, res) => {
  return res.statusCode(200).json({
    success: true,
    message: "Your server is up and running...",
  });
});

app.listen(port, () => {
  console.log(`app is running at port ${port}`);
});
