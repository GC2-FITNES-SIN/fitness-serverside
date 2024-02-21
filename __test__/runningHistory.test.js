const request = require("supertest")
const app = require("../app")
const db = require("../config/mongoConn");
const { ObjectId } = require("mongodb");
const { signToken } = require("../helpers");

let tokenAdm

describe('Running History Testing', () => {
  beforeAll(async () => {
    let data = {
      coordinates: [],
      duration: 120,
      createdAt: new Date(),
      updatedAt: new Date(),
      UserId: new ObjectId() //need from req.user
    }
    tokenAdm = signToken({ id: "65d42418fef264df0075bf42" });
    await db.collection("runningHistories").insertOne(data)
  });

  afterAll(async () => {
    await db.collection("runningHistories").deleteMany()
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
    const response = await request(app).get('/running-history')

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('data')
  });
});