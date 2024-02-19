const Model = require('../models/runningHistory')

class RunningHistoryController {
  static async addRunningHistory(req, res, next) {
    try {
      const data = await Model.addRunningHistory(req.body)
      return res.status(201).json({data})
    } catch (error) {
      console.log(error);
      next(error)
    }
  }

  static async getRunningHistories(req, res, next) {
    try {
      const data = await Model.getRunningHistories(req.user._id)
      return res.json({data})
    } catch (error) {
      console.log(error);
      next(error)
    }
  }
}

module.exports = RunningHistoryController