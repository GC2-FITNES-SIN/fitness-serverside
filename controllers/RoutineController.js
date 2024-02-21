// Import the Routines class
const Routines = require("../models/routines"); // Adjust the path as necessary to correctly import the Routines class
const { redis } = require("../config/redisConn.js");

class RoutineController {
  
    // Get all routines or filter by category if a category query parameter is provided
    static async getAllRoutines(req, res, next) {
        const { search } = req.query;

        if(search) {
          const data = await Routines.searchRoutine(search)
          console.log(data);
          return res.status(200).json({data})
        }
        const redisPost = await redis.get("routines")
        if(redisPost) {
          return res.status(200).json({data: JSON.parse(redisPost)})
        }


        try {
              // Call getAllRoutines from Routines class
              const data = await Routines.getAllRoutines();

              await redis.set("routines", JSON.stringify(data))

              return res.status(200).json({ data });
            
        } catch (error) {
          next(error)        
}
    }
  };

  static async createUserRoutine(req, res, next) {
    try {
      const body = req.body;
      let routineInput = {
        ...body,
        userId: req.user._id
      }
      const data = await Routines.createUserRoutine(routineInput);
      res.status(201).json({ data });
    } catch (error) {
      next(error);
    }
  };

  static async getUserRoutines(req, res, next) {
    console.log("masuk");
    try {
      console.log(req.user, ">>>>>");
      const data = await Routines.getUserRoutines(req.user._id);
      if (!data) throw {name: "NotFound"}

      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}

module.exports = RoutineController;
