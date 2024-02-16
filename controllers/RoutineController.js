// Import the Routines class
const Routines = require('../models/routines'); // Adjust the path as necessary to correctly import the Routines class

class RoutineController {
  
    // Get all routines or filter by category if a category query parameter is provided
    static async getAllRoutines(req, res) {
        const { category, search } = req.query;
        try {
              // Call getAllRoutines from Routines class
              const data = await Routines.getAllRoutines();
              res.status(200).json({ data });
            
        } catch (error) {
            res.status(500).json({ message: "Error retrieving routines", error: error.message });
        }
    }
  
    // Get a single routine by its ID
    static async getRoutineById(req, res) {
        const { id } = req.params;
        try {
            const data = await Routines.getRoutineById(id);
            if (data) {
                res.status(200).json({ message: "Routine retrieved successfully", data: data });
            } else {
                res.status(404).json({ message: "Routine not found" });
            }
        } catch (error) {
            res.status(500).json({ message: "Error retrieving routine", error: error.message });
        }
    }
}

module.exports = RoutineController;