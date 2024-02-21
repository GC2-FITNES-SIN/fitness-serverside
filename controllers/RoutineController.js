// Import the Routines class
const Routines = require("../models/routines"); // Adjust the path as necessary to correctly import the Routines class
const { redis } = require("../config/redisConn.js");
const db = require("../config/mongoConn.js");
const { ObjectId } = require("mongodb");

class RoutineController {
  // Get all routines or filter by category if a category query parameter is provided
  static async getAllRoutines(req, res, next) {
    const { search } = req.query;

    if (search) {
      const data = await Routines.searchRoutine(search);
      console.log(data);
      return res.status(200).json({ data });
    }
    const redisPost = await redis.get("routines");
    if (redisPost) {
      return res.status(200).json({ data: JSON.parse(redisPost) });
    }

    try {
      // Call getAllRoutines from Routines class
      const data = await Routines.getAllRoutines();

      await redis.set("routines", JSON.stringify(data));

      return res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  }

  // Get a single routine by its ID
  static async getRoutineById(req, res, next) {
    const { id } = req.params;
    try {
      const data = await Routines.getRoutineById(id);
      if (data) {
        return res
          .status(200)
          .json({ message: "Routine retrieved successfully", data: data });
      } else {
        return res.status(404).json({ message: "Routine not found" });
      }
    } catch (error) {
      next(error);
    }
  }

  static async createUserRoutine(req, res, next) {
    // console.log("MASOKKKK");
    const body = req.body;
    // console.log(req.user.id, "<<< user id")
    // console.log(body, "<< body");
    const bodyData = {
      scheduleDate: new Date(body.scheduleDate),
      RoutineId: new ObjectId(String(body.RoutineId)),
    };
    try {
      let routineInput = {
        ...bodyData,
        UserId: req.user.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const data = await db.collection("UserRoutines").insertOne(routineInput);
      // console.log(data);
      res.status(201).json({ data });
    } catch (error) {
      // console.log(error);
      next(error);
    }
  }

  static async getUserRoutines(req, res, next) {
    // console.log("masuk");
    try {
      // console.log(req.user, ">>>>>");
      // const data = await db.collection('UserRoutines').findOne({UserId: req.user._id});
      const data = await db
        .collection("users")
        .aggregate([
          {
            $match: {
              _id: new ObjectId("65d42418fef264df0075bf42"),
            },
          },
          {
            $lookup: {
              from: "UserRoutines",
              localField: "_id",
              foreignField: "UserId",
              as: "userRoutinesById",
            },
          },
          {
            $lookup: {
              from: "routines",
              localField: "userRoutinesById.RoutineId",
              foreignField: "_id",
              as: "routineData",
            },
          },
        ])
        .toArray();
      if (!data) throw { name: "NotFound" };

      res.status(200).json(data);
    } catch (error) {
        next(error);
    }
  }
}

module.exports = RoutineController;
