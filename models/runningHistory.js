const runningHistories = require("../config/mongoConn").collection("runningHistories");
const { ObjectId } = require('mongodb')
const haversine = require('haversine') 

class RunningHistory {
  static async addRunningHistory(data) {
    try {
      let distance = 0
      data.forEach((el, i, arr) => {
        if (i + 1 !== data.length) {
          distance += haversine(el, arr[i+1], {unit: 'km'})
        }
      });
      const result = await runningHistories.insertOne({...data, distance})
      return result
    } catch (error) {
      throw error
    }
  }

  static async getRunningHistories(_id) {
    try {
      const result = await runningHistories.find({UserId: ObjectId(_id)}).toArray()
      return result
    } catch (error) {
      throw error
    }
  }
}

module.exports = RunningHistory