const request = require("supertest")
const app = require("../app")
const db = require("../config/mongoConn");
const { ObjectId } = require("mongodb");
const { signToken } = require("../helpers");

let tokenAdm

describe('Running History Testing', () => {
  beforeAll(async () => {
    await db.collection("runningHistories").deleteMany()
    await db.collection("users").deleteMany()

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

    await db.collection("users").insertOne(dataUser)

    const findInsertedUser = await db.collection("users").findOne({ email: "test@mail.com" })

    tokenAdm = signToken(findInsertedUser)

  });

  afterAll(async () => {
    await db.collection("runningHistories").deleteMany()
    await db.collection("users").deleteMany()
  });

  test('POST /running-history should create new Running History', async () => {
    const data = {
      coordinates : [
        {
          latitude: -6.175392,
          longitude: 106.827153
        },
        {
          latitude: -6.175033,
          longitude: 106.827444
        },
        {
          latitude: -6.174684,
          longitude: 106.827735
        },
        {
          latitude: -6.174335,
          longitude: 106.828026
        },
        {
          latitude: -6.173986,
          longitude: 106.828317
        },
        {
          latitude: -6.173637,
          longitude: 106.828608
        },
        {
          latitude: -6.173288,
          longitude: 106.8289
        },
        {
          latitude: -6.172939,
          longitude: 106.829191
        },
      ],
      duration: 300,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    const response = await request(app).post('/running-history')
    .set('Authorization', `Bearer ${tokenAdm}`)
    .send(data)

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('data')
  });

  test('GET /running-history should get data from seed', async () => {
    const response = await request(app).get('/running-history').set('Authorization', `Bearer ${tokenAdm}`)

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('data')
  });
});