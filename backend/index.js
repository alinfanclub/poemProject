const mongoose = require("mongoose");
const cors = require("cors");
const bodyparser = require("body-parser");
const express = require("express");
const app = express();
const chalk = require("chalk");
const { router, Postrouter } = require("./src/api");

// mongodb URL
const MONGO_URI =
  "mongodb+srv://kimseounghun:tkgl5012qq21@mongodbstudy.rgulq2j.mongodb.net/BlogService?retryWrites=true&w=majority";

const sever = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    mongoose.set("debug", true);
    console.log("mongoDB is connected!");
    app.use(express.json());
    app.all("/*", function (req, res, next) {
      res.header("Access-Control-Allow-Origin", "https://kodpp.com");
      res.header("Access-Control-Allow-Headers", "X-Requested-With");
      res.header("Access-Control-Allow-Methods", "OPTIONS,POST,GET,PUT,DELETE");
      next();
    });
    app.use(cors());
    // api
    app.use("/user", router);
    app.use("/post", Postrouter);
    // utils

    // server setup
    async function configServer() {
      port = 3000 || (await detectPort(3000)) || 3000;
    }
    configServer();

    app.listen(port, () =>
      console.log(
        `${chalk.white.bgHex("#41b883").bold(`SERVER IS RUNNING ON ${port}`)}`
      )
    );
  } catch (error) {
    console.log(error);
  }
};

sever();
