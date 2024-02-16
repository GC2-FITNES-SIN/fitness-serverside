// Import the Routines class
const Routines = require('../models/routines'); // Adjust the path as necessary to correctly import the Routines class

class RoutineController {
  
    // Get all routines or filter by category if a category query parameter is provided
    static async getAllRoutines(req, res) {
        const { category, search } = req.query;

        if(search) {
          const data = await Routines.searchRoutine(search)
          console.log(data);
          return res.status(200).json({data})
        }

        try {
              // Call getAllRoutines from Routines class
              const data = await Routines.getAllRoutines();
              return res.status(200).json({ data });
            
        } catch (error) {
            return res.status(500).json({ message: "Error retrieving routines", error: error.message });
        }
    }
  
    // Get a single routine by its ID
    static async getRoutineById(req, res) {
        const { id } = req.params;
        try {
            const data = await Routines.getRoutineById(id);
            if (data) {
                return res.status(200).json({ message: "Routine retrieved successfully", data: data });
            } else {
                return res.status(404).json({ message: "Routine not found" });
            }
        } catch (error) {
            return res.status(500).json({ message: "Error retrieving routine", error: error.message });
        }
    }
}

module.exports = RoutineController;