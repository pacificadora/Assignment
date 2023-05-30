const express = require("express");
const app = express();

require("dotenv").config();
const port = process.env.PORT || 4000;

//use middleware
app.use(express.json());

//connection with routes and mounting it
const blogRoute = require("./routes/blogRoutes");
app.use("/api/v1", blogRoute);

//connecting with db
const connectWithDb = require("./config/database");
connectWithDb();

app.listen(3000, () => {
  console.log("app is running successfully");
});

app.get("/", (req, res) => {
  res.send("this is homepage");
});
