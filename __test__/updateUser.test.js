const request = require("supertest");
const app = require("../app");
const UserController = require("../controllers/UserController");
const { signToken, hashPass } = require("../helpers/index");
const db = require("../config/mongoConn");

let access_Token

beforeAll(async () => {
    await db.collection('users').deleteMany({})
    let userInput = {
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

    await db.collection("users").insertOne(userInput);

    let user = await db.collection("users").findOne({ email: "test@mail.com" })

    access_Token = signToken(user);

})

afterAll(async () => {
    await db.collection('users').deleteMany({})
})


test('PUT /userUpdate should update user', async () => {
  
    const updateField = {
        name: "test2",
        username: "test2",
        email: "test2@mail.com",
        password: "test2",
        phoneNumber: "08123123123",
        image: "test",
        gender: "test",
        weight: 110,
        height: 110,
        age: 26
    }

    const response = await request(app).put('/userUpdate').set('Authorization', `Bearer ${access_Token}`).send(updateField)

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('message', 'User updated successfully')

})

