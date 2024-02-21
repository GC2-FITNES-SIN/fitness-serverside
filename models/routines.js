// create a code to call collection from mongodb
const db = require('../config/mongoConn.js');
const { ObjectId } = require('mongodb')

class Routines {

  static async searchRoutine(search) {
    try { 

        const data = await db.collection('routines').find({
            routineName: { $regex: search, $options: 'i' } // Correctly using $options here
        }).toArray()
        return data
    } catch(error) {
        throw error
    }
  }
  static async getAllRoutines() {
    try {
      const routines = await db.collection('routines').find({}).toArray();
      return routines;
    } catch (error) {
      throw error;
    }
  }

  static async getRoutineById(id) {
    try {
        const routine = await db.collection('routines').findOne({ _id: new ObjectId(id) });
        return routine;
    } catch (error) {
      throw error;
    }
  }

  static async getRoutinesByCategory(category) {
    try {
      const routines = await db.collection('routines').find({ category: category }).toArray();
      return routines;
    } catch (error) {
      throw error;
    }
  };

  static async getUserRoutines(id) {
    try {
      const routines = await db.collection('userRoutines').find({ userId: id }).toArray();
      console.log(routines, "MODEL ROUTINES");
      return routines;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  static async createUserRoutine() {
    try {
      const data = await db.collection('userRoutines').insertOne({}); 
      return data;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Routines;
