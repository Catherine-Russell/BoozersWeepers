const app = require("../../app");
const request = require("supertest");
require("../mongodb_helper");
const User = require('../../models/user');
const Wager = require('../../models/wager');

const JWT = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

let token;
let testDate = new Date("2022-03-25")
let testDeadline = new Date("2022-03-27")

describe("POST /wagers -> create new wager", () => {
  beforeAll( async () => {
    const user1 = new User({email: "user1@test.com", username: "user1", password: "12345678!"});
		// const challengedUser = new User({email: "challengerUser@test.com", username: "challengerUser", password: "98765432!"})
    await user1.save();
		// await challengedUser.save();

// Sets up user and token for each test
    token = JWT.sign({
      user_id: user1.id,
      // Backdate this token of 5 minutes
      iat: Math.floor(Date.now() / 1000) - (5 * 60),
      // Set the JWT token to expire in 10 minutes
      exp: Math.floor(Date.now() / 1000) + (10 * 60)
    }, secret);
  });

  beforeEach( async () => {
    await Wager.deleteMany({});
  })

  afterAll( async () => {
    await User.deleteMany({});
    await Wager.deleteMany({});
  })


  describe("POST, when token is present", () => {
    test("responds with a 201", async () => {
      let response = await request(app)
        .post("/wagers")
        .set("Authorization", `Bearer ${token}`)
        .send({ description: "test wager", datemade: testDate, deadline: testDeadline, token: token });
      expect(response.status).toEqual(201);
    });

    test("creates a new wager", async () => {
      await request(app)
			.post("/wagers")
			.set("Authorization", `Bearer ${token}`)
			.send({ description: "test wager", datemade: testDate, deadline: testDeadline, token: token })
			let wagers = await Wager.find();
      expect(wagers.length).toEqual(1);
      expect(wagers[0].description).toEqual("test wager");
    });
  
    test("returns a new token", async () => {
      let response = await request(app)
			.post("/wagers")
			.set("Authorization", `Bearer ${token}`)
			.send({ description: "test wager", datemade: testDate, deadline: testDeadline, token: token });
      let newPayload = JWT.decode(response.body.token, process.env.JWT_SECRET);
      let originalPayload = JWT.decode(token, process.env.JWT_SECRET);
      expect(newPayload.iat > originalPayload.iat).toEqual(true);
    });  
  });
  
  describe("POST, when token is missing", () => {
    test("responds with a 401", async () => {
      let response = await request(app)
			.post("/wagers")
			.send({ description: "test wager", datemade: testDate, deadline: testDeadline, token: token });
      expect(response.status).toEqual(401);
    });
  
    test("a wager is not created", async () => {
      await request(app)
			.post("/wagers")
			.send({ description: "test wager", datemade: testDate, deadline: testDeadline, token: token });
      let wagers = await Wager.find();
      expect(wagers.length).toEqual(0);
    });
  
    test("a token is not returned", async () => {
      let response = await request(app)
			.post("/wagers")
			.send({ description: "test wager", datemade: testDate, deadline: testDeadline, token: token });
      expect(response.body.token).toEqual(undefined);
    });
  })
})