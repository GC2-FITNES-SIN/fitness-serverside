// /routers/index.js
require("dotenv").config();
const express = require("express");
const authentication = require("../middlewares");
const UserController = require("../controllers/UserController.js");
const errorHandler = require("../middlewares/errorHandler");
const router = express.Router();

// Import controllers
// const UserController = require('../controllers/UserController');
const RoutineController = require('../controllers/RoutineController.js');
const RunningHistoryController = require('../controllers/RunningHistoryController');

router.post("/register", UserController.register);
router.post("/login", UserController.login)
// Routines
router.get("/routines", RoutineController.getAllRoutines);
router.get("/routines/:id", RoutineController.getRoutineById);
router.get("/routines?search=", RoutineController.getAllRoutines); // This might conflict with the above get /routines endpoint
router.use(authentication)
router.put("/userUpdate", UserController.updateUser);

// User Routines
router.post("/user-routines", RoutineController.createUserRoutine);
router.get("/user-routines", RoutineController.getUserRoutines); // already filtered
// router.put("/user-routines/:id", /* RoutineController.updateUserRoutine */); // id is for userRoutines
// router.delete("/user-routines/:id", /* RoutineController.deleteUserRoutine */); // id is for userRoutines

// Running History
router.get("/running-history", RunningHistoryController.getRunningHistories ); // already filtered
router.post("/running-history", RunningHistoryController.addRunningHistory );
// route here

// middleware here
router.use(errorHandler)

module.exports = router;
