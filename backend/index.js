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

// mongodb URL
const MONGO_URI =
  "mongodb+srv://kimseounghun:tkgl5012qq21@mongodbstudy.rgulq2j.mongodb.net/BlogService?retryWrites=true&w=majority";

const sever = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    mongoose.set("debug", true);
    console.log("mongoDB is connected!");
    app.use(express.json());

    app.use(function (req, res, next) {

      // Website you wish to allow to connect
      res.setHeader('Access-Control-Allow-Origin', '*');
  
      // Request methods you wish to allow
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
      // Request headers you wish to allow
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  
      // Set to true if you need the website to include cookies in the requests sent
      // to the API (e.g. in case you use sessions)
      res.setHeader('Access-Control-Allow-Credentials', true);
  
      // Pass to next layer of middleware
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
