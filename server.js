const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const users = require("./routes/api/users")
const posts = require("./routes/api/posts")
const profile = require("./routes/api/profile")

const app = express();
//bodyParser setup
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// DB config
const db = require("./config/keys").MONGOURI || "mongodb://127.0.0.1:27017/soc_set";
mongoose
  .connect(db)
  .then(() => console.log("Mongo DB connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("hello");
});

// Use routes
app.use("/api/users", users)
app.use("/api/profile", profile)
app.use("/api/posts", posts)

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server running on port ", port);
});
