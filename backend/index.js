const mongoose = require("mongoose");
const cors = require("cors");
const bodyparser = require("body-parser");
const morgan = require("morgan");
const express = require("express");
const app = express();
const chalk = require("chalk");
const { ServerApiVersion } = require("mongodb");
const { router, Postrouter } = require("./src/api");
const { authenticateUser } = require("./src/utils/auth");
require("dotenv").config();

// mongodb URL
const MONGO_URI =
  "mongodb+srv://kimseounghun:tkgl5012qq21@mongodbstudy.rgulq2j.mongodb.net/BlogService?retryWrites=true&w=majority";

const sever = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || MONGO_URI);
    mongoose.set("debug", true);
    console.log("mongoDB is connected!");
    app.use(express.json());
    app.use(cors());

    // api
    app.use("/user", router);
    app.use("/post", Postrouter);
    // utils

    // server setup
    async function configServer() {
      port = process.env.PORT || (await detectPort(3000)) || 3000;
    }
    configServer();

    app.listen(process.env.PORT || port, () =>
      console.log(
        `${chalk.white.bgHex("#41b883").bold(`SERVER IS RUNNING ON ${port}`)}`
      )
    );
  } catch (error) {
    console.log(error);
  }
};

sever();
