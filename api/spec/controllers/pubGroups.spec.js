const app = require("../../app");
const request = require("supertest");
require("../mongodb_helper");
const User = require('../../models/user');
const PubGroup = require('../../models/pubGroup');

const JWT = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

describe("POST /pubgroup -> creates a new wager", () => {
  beforeAll( async () => {
    let user = new User({email: "user@test.com", username: "user", password: "12345678!"});
    await user.save();

// Sets up user and token for each test
    token = JWT.sign({
      user_id: user.id,
      // Backdate this token of 5 minutes
      iat: Math.floor(Date.now() / 1000) - (5 * 60),
      // Set the JWT token to expire in 10 minutes
      exp: Math.floor(Date.now() / 1000) + (10 * 60)
    }, secret);
  });

  beforeEach( async () => {
    await PubGroup.deleteMany({});
  })

  afterAll( async () => {
    await User.deleteMany({});
    await PubGroup.deleteMany({});
  })

// TESTS for creating a new group when the user is logged in (successful)

  describe("POST, when token is present creates new pubgroup", () => {
    test("responds with a 201", async () => {
      let response = await request(app)
        .post("/pubgroups")
        .set("Authorization", `Bearer ${token}`)
        .send({ name: "test group", token: token });
      expect(response.status).toEqual(201);
    });

    test("creates a new pubGroup", async () => {
      await request(app)
			.post("/pubGroups")
			.set("Authorization", `Bearer ${token}`)
			.send({ name: "test group", token: token })
			let pubGroups = await PubGroup.find();
      expect(pubGroups.length).toEqual(1);
      expect(pubGroups[0].name).toEqual("test group");
    });
  
    test("returns a new token", async () => {
      let response = await request(app)
			.post("/pubGroups")
			.set("Authorization", `Bearer ${token}`)
			.send({ name: "test group", token: token })
      let newPayload = JWT.decode(response.body.token, process.env.JWT_SECRET);
      let originalPayload = JWT.decode(token, process.env.JWT_SECRET);
      expect(newPayload.iat > originalPayload.iat).toEqual(true);
    });
  });  

// TESTS for creating a new group when the user is logged out (unsuccessful)
  
  describe("POST, when token is missing", () => {
    test("responds with a 401", async () => {
      let response = await request(app)
			.post("/pubGroups")
			.send({ name: "test group"})
      expect(response.status).toEqual(401);
    });
  });
  
    test("a pub Group is not created", async () => {
      await request(app)
			.post("/pubGroups")
			.send({ name: "test group"})
      let pubGroups = await PubGroup.find();
      expect(pubGroups.length).toEqual(0);
    });
  
    test("a token is not returned", async () => {
      let response = await request(app)
			.post("/pubGroups")
			.send({ name: "test group"})
      expect(response.body.token).toEqual(undefined);
    });
  });
