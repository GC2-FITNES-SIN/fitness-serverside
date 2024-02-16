// app.js
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();

const router = require("./routers");

app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(router);

module.exports = app;
