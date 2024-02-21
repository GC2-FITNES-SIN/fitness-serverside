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
        height: 100,
        age: 25
    }

    let newUser = await db.collection('users').insertOne(userInput);

})

afterAll(async () => {
    await db.collection('users').deleteMany({})
})

test('POST /login should response Login success', async () => {
    const loginTestData = {
        password: "test",
        email: "test@mail.com"
    }

    const response = await request(app).post('/login').send(loginTestData);

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('username', expect.any(String))
    expect(response.body).toHaveProperty('email', expect.any(String))
    expect(response.body).toHaveProperty('image', expect.any(String))
    expect(response.body).toHaveProperty('age', expect.any(Number))
    expect(response.body).toHaveProperty('gender', expect.any(String))
    expect(response.body).toHaveProperty('weight', expect.any(Number))
    expect(response.body).toHaveProperty('height', expect.any(Number))
    // expect(response.body).toHaveProperty('access_token')
})

test('POST /login should response Password is required', async () => {
    const loginTestData = {
        username: "test",
        email: "test@mail.com"
    }

    const response = await request(app).post('/login').send(loginTestData);

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('message', 'Password is required')
})

// test('POST /login should response Username not found', async () => {
//     const loginTestData = {
//         username: "test1",
//         password: "test"
//     }

//     const response = await request(app).post('/login').send(loginTestData);

//     expect(response.status).toBe(404)
//     expect(response.body).toHaveProperty('message', 'Username not found')
// })

test('POST /login should response Invalid email or password', async () => {
    const loginTestData = {
        username: "test",
        email: "test1@mail.com",
        password: "test1"
    }

    const response = await request(app).post('/login').send(loginTestData);

    expect(response.status).toBe(401)
    expect(response.body).toHaveProperty('message', 'Invalid email or password')
})

