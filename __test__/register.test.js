// register.test.js 
const request = require("supertest");
const app = require("../app");
const UserController = require("../controllers/UserController");
const { signToken } = require("../helpers/index");
const db = require("../config/mongoConn");

beforeAll(async () => {
    await db.collection('users').deleteMany({})
})

afterAll(async () => {
    await db.collection('users').deleteMany({})
})

test('POST /register should response Register success', async () => {
    const registerTestData = {
        name: "test",
        username: "test",
        email: "test@mail.com",
        password: "test",
        phoneNumber: "08123123123",
        image: "test",
        gender: "test",
        weight: 100,
        height: 100
    }

    const response = await request(app).post('/register').send(registerTestData);

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('message', 'Register success')
    expect(response.body).toHaveProperty('data')
})

test('POST /register should response Name is required', async () => {
    const registerTestData = {
        username: "test",
        email: "test@mail.com",
        password: "test",
        phoneNumber: "08123123123",
        image: "test",
        gender: "test",
        weight: 100,
        height: 100
    }

    const response = await request(app).post('/register').send(registerTestData)

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('message', 'Name is required')
})

test('POST /register should response Username is required', async () => {
    const registerTestData = {
        name: "test",
        email: "test@mail.com",
        password: "test",
        phoneNumber: "08123123123",
        image: "test",
        gender: "test",
        weight: 100,
        height: 100
    }

    const response = await request(app).post('/register').send(registerTestData)

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('message', 'Username is required')
})

test('POST /register should response Email is required', async () => {
    const registerTestData = {
        name: "test",
        username: "test",
        password: "test",
        phoneNumber: "08123123123",
        image: "test",
        gender: "test",
        weight: 100,
        height: 100
    }

    const response = await request(app).post('/register').send(registerTestData)

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('message', 'Email is required')
})

test('POST /register should response Password is required', async () => {
    const registerTestData = {
        name: "test",
        username: "test",
        email: "test@maili.com",
        phoneNumber: "08123123123",
        image: "test",
        gender: "test",
        weight: 100,
        height: 100
    }

    const response = await request(app).post('/register').send(registerTestData)

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('message', 'Password is required')
})

test('POST /register should response Weight is required', async () => {
    const registerTestData = {
        name: "test",
        username: "test",
        email: "test@maili.com",
        password: "test",
        phoneNumber: "08123123123",
        image: "test",
        gender: "test",
        height: 100
    }

    const response = await request(app).post('/register').send(registerTestData)

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('message', 'Weight is required')
})

test('POST /register should response Height is required', async () => {
    const registerTestData = {
        name: "test",
        username: "test",
        email: "test@maili.com",
        password: "test",
        phoneNumber: "08123123123",
        image: "test",
        gender: "test",
        weight: 100
    }

    const response = await request(app).post('/register').send(registerTestData)

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('message', 'Height is required')
})

test('POST /register should response Invalid email format', async () => {
    const registerTestData = {
        name: "test",
        username: "test",
        email: "wrongformat",
        password: "test",
        phoneNumber: "08123123123",
        image: "test",
        gender: "test",
        weight: 100,
        height: 100
    }

    const response = await request(app).post('/register').send(registerTestData)

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('message', 'Invalid email format')
})

test('POST /register should response Email already exist', async () => {
    const registerTestData = {
        name: "test",
        username: "test",
        email: "test@gmail.com",
        password: "testing",
        phoneNumber: "08123123123",
        image: "test",
        gender: "test",
        weight: 100,
        height: 100
    }

    const seedData = {
        name: "test",
        username: "test",
        email: "test@gmail.com",
        password: "testing",
        phoneNumber: "08123123123",
        image: "test",
        gender: "test",
        weight: 100,
        height: 100
    }

    const insertTestData = await db.collection('users').insertOne(seedData)

    const response = await request(app).post('/register').send(registerTestData)

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('message', 'Email already exist')
})

