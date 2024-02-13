const express = require("express");
const authentication = require("../middlewares");
const UserController = require("../controllers.js/user");
const errorHandler = require("../middlewares/errorHandler");
const router = express.Router();

// route here
router.post("/register", UserController.register);
router.post("/login", UserController.login)

// middleware here
router.use(authentication)
// router.use(errorHandler)

module.exports = router;
