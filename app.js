// app.js
require("dotenv").config();

const port = 3000

const express = require("express");
const cors = require("cors");
const app = express();

const router = require("./routers");

app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(router);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

module.exports = app;
