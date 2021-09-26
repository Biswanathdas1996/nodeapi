const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const feedRoutes = require("./routes/feed");

const app = express();

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json
app.use("/images", express.static(path.join(__dirname, "images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/feed", feedRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
});

mongoose
  .connect(
    "mongodb://Papun1996:jnRRuaTXzlsssgA7@cluster0-shard-00-00.9ungu.mongodb.net:27017,cluster0-shard-00-01.9ungu.mongodb.net:27017,cluster0-shard-00-02.9ungu.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-14ilxc-shard-0&authSource=admin&retryWrites=true&w=majority"
  )
  .then((result) => {
    app.listen(8080);
    console.log("Connection established");
  })
  .catch((err) => console.log(err));
