// Import the Routines class
const Routines = require('../models/routines'); // Adjust the path as necessary to correctly import the Routines class
const { redis } = require('../config/redisConn.js')

class RoutineController {
  
    // Get all routines or filter by category if a category query parameter is provided
    static async getAllRoutines(req, res, next) {
        const { search } = req.query;

        const redisPost = await redis.get("routines")
        if(redisPost) {
          return res.status(200).json({data: JSON.parse(redisPost)})
        }

        if(search) {
          const data = await Routines.searchRoutine(search)
          console.log(data);
          return res.status(200).json({data})
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
  
    // Get a single routine by its ID
    static async getRoutineById(req, res, next) {
        const { id } = req.params;
        try {
            const data = await Routines.getRoutineById(id);
            if (data) {
                return res.status(200).json({ message: "Routine retrieved successfully", data: data });
            } else {
                return res.status(404).json({ message: "Routine not found" });
            }
        } catch (error) {
            next(error)        
          }
    }
}

module.exports = RoutineController;