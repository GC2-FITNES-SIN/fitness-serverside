const request = require("supertest");
const app = require("../app.js");
const Routines = require("../models/routines.js"); // Adjust the path as necessary to correctly import the Routines class
const { redis } = require("../config/redisConn.js");
const db = require("../config/mongoConn.js");
const { ObjectId } = require("mongodb");
const { signToken } = require("../helpers/index.js");
const { TemplateLiteralGenerator } = require("@sinclair/typebox");

let id
let search
let tokenAdm

beforeAll(async () => {
  let inputData = [
    {
      routineName: "test",
      routineDescription: "test",
      routineCategory: "test",
      routineImageStart: "test",
      routineImageEnd: "test",
    },
    {
      routineName: "test",
      routineDescription: "test",
      routineCategory: "test",
      routineImageStart: "test",
      routineImageEnd: "test",
    },
  ];

  // await redis.del("routines");
  tokenAdm = signToken({ id: "65d42418fef264df0075bf42" });
  await db.collection("routines").insertMany(inputData);
  let findOneData = await db.collection("routines").find({}).toArray();
  id = findOneData[0]._id;
});

afterAll(async () => {
  // await redis.del("routines");
  await db.collection("routines").deleteMany({});
})

test("GET /routines should response with 200 status code", async () => {
  console.log('testsssssssssssssss');
  const response = await request(app).get("/routines");
  expect(response.status).toBe(200);
  expect(response.body).toHaveProperty('data', expect.any(Array));
})

test("GET /routines?search should response with 200 status code", async () => {
    
    search = 'test'

    const response = await request(app).get(`/routines?search=${search}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data', expect.any(Array));
  })

test("GET /routines/:id should response with 200 status code", async () => {
  
  const response = await request(app).get(`/routines/${id}`);

  expect(response.status).toBe(200);
  expect(response.body).toHaveProperty('message', 'Routine retrieved successfully');
  expect(response.body).toHaveProperty('data', expect.any(Object));
})

test("GET /routines/:id should response with 200 status code", async () => {
    
    id = new ObjectId('65d42801ac0610fa9d1dd139')

    const response = await request(app).get(`/routines/${id}`);
  
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message', 'Routine not found');
  })