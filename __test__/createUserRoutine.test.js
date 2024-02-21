// createUserRoutine test
// __test__/createUserRoutine.test.js
const request = require("supertest")
const app = require("../app")
const db = require("../config/mongoConn.js");
const { ObjectId } = require("mongodb");
const { signToken } = require("../helpers/index");


let id
let routineId
let accessToken
let accessToken2

beforeAll(async () => {
    await db.collection('users').deleteMany({})
    await db.collection('routines').deleteMany({})
    await db.collection('runningHistories').deleteMany({})
    let dataUser = {
        name: "test",
        username: "test",
        email: "test@mail.com",
        password: "test",
        phoneNumber: "08123123123",
        image: "test",
        gender: "test",
        weight: 100,
        height: 100,
        age: 25
    }
    await db.collection('users').insertOne(dataUser)

    const findInsertedUser = await db.collection('users').findOne({ email: "test@mail.com" })

    accessToken = signToken(findInsertedUser)

    let dataUser2 = {
        name: "test",
        username: "test",
        email: "test2@mail.com",
        password: "test",
        phoneNumber: "08123123123",
        image: "test",
        gender: "test",
        weight: 100,
        height: 100,
        age: 25
    }

    await db.collection('users').insertOne(dataUser2)

    const findInsertedUser2 = await db.collection('users').findOne({ email: "test2@mail.com" })

    accessToken2 = signToken(findInsertedUser2)

    let dataRoutine = {
        routineName: "test",
        routineDescription: "test",
        routineCategory: "test",
        routineImageStart: "test",
        routineImageEnd: "test",
    }

    let routine = await db.collection('routines').insertOne(dataRoutine)

    let user = await db.collection('users').findOne({ email: "test@mail.com" })

    id = user._id
    routineId = routine.insertedId

})

afterAll(async () => {
    await db.collection('users').deleteMany({})
    await db.collection('routines').deleteMany({})
    await db.collection('runningHistories').deleteMany({})
})

test('POST /should response with 201', async () => {
  
  const response = await request(app).post('/user-routines').send({
    scheduleDate: new Date(),
    RoutineId: routineId.toString()
  }).set("Authorization", `Bearer ${accessToken}`);

  expect(response.status).toBe(201)
  expect(response.body).toHaveProperty('data')

})

test('GET / should response with 200', async () => {
    const response = await request(app).get('/user-routines').set("Authorization", `Bearer ${accessToken}`);
    expect(response.status).toBe(200);
    expect(response.body[0]).toHaveProperty('email', 'test@mail.com');
    expect(response.body[0]).toHaveProperty('routineData');
    expect(response.body[0].routineData[0]).toHaveProperty('routineName', 'test');
    expect(response.body[0]).toHaveProperty('userRoutinesById');
    expect(response.body[0].userRoutinesById[0]).toHaveProperty('RoutineId');
    
})

test('GET / should response with 404', async () => {
    const response = await request(app).get('/user-routines').set("Authorization", `Bearer ${accessToken2}`);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message', "User's routine not found");
})

