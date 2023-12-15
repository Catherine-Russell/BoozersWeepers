const app = require("../../app");
const request = require("supertest");

require("../mongodb_helper");
const User = require('../../models/user');
const JWT = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

let token;
let user1;
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
    test("returns a user based on the id", async () => {
      let user3 = new User({email: "poppy@email.com",username: "Captain test", password: "1234"})
      await user3.save()
      let response = await request(app)

        .get(`/userdata/${user3._id}`)
        .set("Authorization", `Bearer ${token}`)
        .send({token: token});
      
      expect(response.body.user.username).toEqual("Captain test");
    })
    
    

  })