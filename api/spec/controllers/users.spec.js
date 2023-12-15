const app = require("../../app");
const request = require("supertest");
require("../mongodb_helper");
const User = require('../../models/user');
const JWT = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

let token;

describe("/users", () => {
  beforeAll( async () => {
    let user1 = new User({email: "poppy@email.com",username: "mrstest", password: "1234"});
    let user2 = new User({email: "cat@email.com",username: "mrtest", password: "1234"});
    await user1.save();
    await user2.save();
  
    token = JWT.sign({
    user_id: user1.id,
    // Backdate this token of 5 minutes
    iat: Math.floor(Date.now() / 1000) - (5 * 60),
    // Set the JWT token to expire in 10 minutes
    exp: Math.floor(Date.now() / 1000) + (10 * 60)
    }, secret);
  });
  beforeEach( async () => {
    await User.deleteMany({});
  });
  afterEach( async () => {

    await User.deleteMany({});
  })


  describe("POST, when email and password are provided", () => {
    test("the response code is 201", async () => {
      let response = await request(app)
        .post("/users")
        .send({email: "poppy@email.com",username: "test", password: "1234"})
      expect(response.statusCode).toBe(201)
    })

    test("a user is created", async () => {
      await request(app)
        .post("/users")
        .send({email: "scarlett@email.com",username: "test", password: "1234"})
      let users = await User.find()
      let newUser = users[users.length - 1]
      expect(newUser.email).toEqual("scarlett@email.com")
    })
  })

  describe("POST, when password is missing", () => {
    test("response code is 400", async () => {
      let response = await request(app)
        .post("/users")
        .send({email: "skye@email.com", username: "test"})
      expect(response.statusCode).toBe(400)
    });

    test("does not create a user", async () => {
      await request(app)
        .post("/users")
        .send({email: "skye@email.com", username: "test"})
        let users = await User.find()
        expect(users.length).toEqual(0)
    });

  })
  
  describe("POST, when email is missing", () => {
    test("response code is 400", async () => {
      let response = await request(app)
        .post("/users")
        .send({password: "1234", username: "test"})
      expect(response.statusCode).toBe(400)
    });

    test("does not create a user", async () => {
      await request(app)
        .post("/users")
        .send({password: "1234", username: "test"})
      let users = await User.find()
      expect(users.length).toEqual(0)
    });
  })
  describe("POST, when username is missing", () => {
    test("response code is 400", async () => {
      let response = await request(app)
        .post("/users")
        .send({email: "skye@email.com", password: "1234"})
      expect(response.statusCode).toBe(400)
    });

    test("does not create a user", async () => {
      await request(app)
        .post("/users")
        .send({email: "skye@email.com", password: "1234"})
      let users = await User.find()
      expect(users.length).toEqual(0)
    });
  })})

