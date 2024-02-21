const runningHistories = require("../config/mongoConn").collection("runningHistories");
const { ObjectId } = require("mongodb");
const haversine = require("haversine");

class RunningHistory {
	static async addRunningHistory(data) {
		try {
			let distance = 0;
			data?.cordinates?.forEach((el, i, arr) => {
				if (i + 1 !== arr.length) {
					let start = {
						latitude: Number(el.latitude),
						longitude: Number(el.longitude),
					};
					let end = {
						latitude: Number(arr[i + 1].latitude),
						longitude: Number(arr[i + 1].longitude),
					};
					distance += haversine(start, end, { unit: "km" });
				}
			});
			const result = await runningHistories.insertOne({ ...data, distance });
			return result;
		} catch (error) {
			throw error;
		}
	}

	static async getRunningHistories(_id) {
		try {
			const result = await runningHistories.find({ UserId: ObjectId(_id) }).toArray();
			return result;
		} catch (error) {
			throw error;
		}
	}
}

module.exports = RunningHistory;
