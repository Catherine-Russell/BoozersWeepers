const app = require("../../app");
const request = require("supertest");
require("../mongodb_helper");
const User = require('../../models/user');
const JWT = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

let token;

describe("/users", () => {
  beforeEach( async () => {
    await User.deleteMany({});
  });

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

// Tests Index
describe("GET, when token is present", () => {
  
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

  afterAll(async () => {
    await User.deleteMany({});
  });

  test("returns every user in the database", async () => {
    let response = await request(app)
      .get("/userdata")
      .set("Authorization", `Bearer ${token}`)
      .send({token: token});
    let usernames= response.body.users.map((user) => ( user.username ));
    expect(usernames).toEqual(["mrstest", "mrtest"]);
  })

  test("the response code is 200", async () => {

    let response = await request(app)
      .get("/userdata")
      .set("Authorization", `Bearer ${token}`)
      .send({token: token});
    expect(response.status).toEqual(200);
  })

  test("returns a new token", async () => {
    let response = await request(app)
      .get("/userdata")
      .set("Authorization", `Bearer ${token}`)
      .send({token: token});
    let newPayload = JWT.decode(response.body.token, process.env.JWT_SECRET);
    let originalPayload = JWT.decode(token, process.env.JWT_SECRET);
    expect(newPayload.iat > originalPayload.iat).toEqual(true);
  })
})

describe("GET, when token is missing", () => {
  test("returns no posts", async () => {
    let response = await request(app)
      .get("/userdata");
    expect(response.body.users).toEqual(undefined);
  })

  test("the response code is 401", async () => {
    let response = await request(app)
      .get("/userdata");
    expect(response.status).toEqual(401);
  })

  test("does not return a new token", async () => {
    let response = await request(app)
      .get("/userdata");
    expect(response.body.token).toEqual(undefined);
  })
})
