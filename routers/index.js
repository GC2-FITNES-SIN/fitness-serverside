// /routers/index.js
const express = require("express");
const router = express.Router();

// Import controllers
// const UserController = require('../controllers/UserController');
const RoutineController = require('../controllers/RoutineController.js');
// const RunningHistoryController = require('../controllers/RunningHistoryController');

// Login and Registration
router.post("/login", /* UserController.login */);
router.post("/register", /* UserController.register */);

// Routines
router.get("/routines", /* RoutineController.getAllRoutines */);
router.get("/routines/:id", /* RoutineController.getRoutineById */);
router.get("/routines?category=", /* RoutineController.getRoutinesByCategory */); // This might conflict with the above get /routines endpoint

// User Routines
router.post("/user-routines", /* RoutineController.createUserRoutine */);
router.get("/user-routines", /* RoutineController.getUserRoutines */); // already filtered
router.put("/user-routines/:id", /* RoutineController.updateUserRoutine */); // id is for userRoutines
router.delete("/user-routines/:id", /* RoutineController.deleteUserRoutine */); // id is for userRoutines

// Running History
router.get("/running-history", /* RunningHistoryController.getRunningHistory */); // already filtered
router.post("/running-history", /* RunningHistoryController.createRunningHistory */);

// middleware here

module.exports = router;
