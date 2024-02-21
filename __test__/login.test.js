// login.test.js
const request = require("supertest");
const app = require("../app");
const UserController = require("../controllers/UserController");
const { signToken, hashPass } = require("../helpers/index");
const db = require("../config/mongoConn.js");

beforeAll(async () => {
    let userInput = {
        name: "test",
        username: "test",
        email: "test@mail.com",
        password: hashPass("test"),
        phoneNumber: "08123123123",
        image: "test",
        gender: "test",
        weight: 100,
        height: 100
    }

    let newUser = await db.collection('users').insertOne(userInput);

})

afterAll(async () => {
    await db.collection('users').deleteMany({})
})

test('POST /login should response Login success', async () => {
    const loginTestData = {
        username: "test",
        password: "test"
    }

    const response = await request(app).post('/login').send(loginTestData);

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('message', 'Login success')
    expect(response.body).toHaveProperty('token', expect.any(String))
})

test('POST /login should response Username is required', async () => {
    const loginTestData = {
        password: "test"
    }

    const response = await request(app).post('/login').send(loginTestData);

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('message', 'Username is required')
})

test('POST /login should response Password is required', async () => {
    const loginTestData = {
        username: "test"
    }

    const response = await request(app).post('/login').send(loginTestData);

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('message', 'Password is required')
})

test('POST /login should response Username not found', async () => {
    const loginTestData = {
        username: "test1",
        password: "test"
    }

    const response = await request(app).post('/login').send(loginTestData);

    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('message', 'Username not found')
})

test('POST /login should response Wrong password', async () => {
    const loginTestData = {
        username: "test",
        password: "test1"
    }

    const response = await request(app).post('/login').send(loginTestData);

    expect(response.status).toBe(401)
    expect(response.body).toHaveProperty('message', 'Wrong password')
})

