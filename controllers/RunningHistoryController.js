const Model = require("../models/runningHistory");
const { ObjectId } = require("mongodb");

class RunningHistoryController {
	static async addRunningHistory(req, res, next) {
		try {
			const data = await Model.addRunningHistory({ ...req.body, UserId: req.user.id });
			return res.status(201).json({ data });
		} catch (error) {
			console.log(error);
			next(error);
		}
	}

	static async getRunningHistories(req, res, next) {
		console.log("MAsuk");
		try {
			console.log(req.user.id, ">>>>");
			const data = await Model.getRunningHistories(req.user.id);
			return res.json({ data });
		} catch (error) {
			console.log(error);
			next(error);
		}
	}
}

module.exports = RunningHistoryController;
