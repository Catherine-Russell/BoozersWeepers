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
let user1;
let challengedUser;


describe("POST /wagers -> create new wager", () => {
  beforeAll( async () => {
    user1 = new User({email: "user1@test.com", username: "user1", password: "12345678!"});
		challengedUser = new User({email: "challengerUser@test.com", username: "challengerUser", password: "98765432!"})
    await user1.save();
		await challengedUser.save();

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

		test("logged in user is first in the array of people involved", async () => {
      await request(app)
			.post("/wagers")
			.set("Authorization", `Bearer ${token}`)
			.send({ description: "test wager", datemade: testDate, deadline: testDeadline, token: token })
			let wagers = await Wager.find();
      expect(String(wagers[0].peopleInvolved[0])).toEqual(user1.id);
		})

		test("challenged user is second in the array of people involved", async () => {
      await request(app)
			.post("/wagers")
			.set("Authorization", `Bearer ${token}`)
			.send({ description: "test wager", datemade: testDate, deadline: testDeadline, challengedUser: challengedUser.id, token: token })
			let wagers = await Wager.find();
      expect(String(wagers[0].peopleInvolved[1])).toEqual(challengedUser.id);
		})
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
  describe("GET, when token is present", () => {
    test("returns every post in the collection", async () => {
      let wager1 = Wager({ description: "test wager1", datemade: testDate, deadline: testDeadline, challengedUser: challengedUser.id, token: token })
      let wager2 = Wager({ description: "test wager2", datemade: testDate, deadline: testDeadline, challengedUser: challengedUser.id, token: token })
      await wager1.save();
  
      await wager2.save();
      let response = await request(app)
        .get("/wagers")
        .set("Authorization", `Bearer ${token}`)
        .send({token: token});
      let wagers = response.body.wagers.map((wager) => ( wager.description ));
      expect(wagers).toEqual(["test wager1", "test wager2"]);
    })
  

    test("the response code is 200", async () => {
      let wager1 = Wager({ description: "test wager1", datemade: testDate, deadline: testDeadline, challengedUser: challengedUser.id, token: token })
      let wager2 = Wager({ description: "test wager2", datemade: testDate, deadline: testDeadline, challengedUser: challengedUser.id, token: token })
      await wager1.save();
  
      await wager2.save();
      let response = await request(app)
        .get("/wagers")
        .set("Authorization", `Bearer ${token}`)
        .send({token: token});
      expect(response.status).toEqual(200);
    })
  

    test("returns a new token", async () => {
      let wager1 = Wager({ description: "test wager1", datemade: testDate, deadline: testDeadline, challengedUser: challengedUser.id, token: token })
      let wager2 = Wager({ description: "test wager2", datemade: testDate, deadline: testDeadline, challengedUser: challengedUser.id, token: token })
      await wager1.save();
  
      await wager2.save();
      let response = await request(app)
        .get("/wagers")
        .set("Authorization", `Bearer ${token}`)
        .send({token: token});
      let newPayload = JWT.decode(response.body.token, process.env.JWT_SECRET);
      let originalPayload = JWT.decode(token, process.env.JWT_SECRET);
      expect(newPayload.iat > originalPayload.iat).toEqual(true);
    })
  })

  describe("GET, when token is missing", () => {
    test("returns no posts", async () => {
      let wager1 = Wager({ description: "test wager1", datemade: testDate, deadline: testDeadline, challengedUser: challengedUser.id, token: token })
      let wager2 = Wager({ description: "test wager2", datemade: testDate, deadline: testDeadline, challengedUser: challengedUser.id, token: token })
      await wager1.save();
      await wager2.save();
      let response = await request(app)
        .get("/wagers");
      expect(response.body.wagers).toEqual(undefined);
    })

    test("the response code is 401", async () => {
      let wager1 = Wager({ description: "test wager1", datemade: testDate, deadline: testDeadline, challengedUser: challengedUser.id, token: token })
      let wager2 = Wager({ description: "test wager2", datemade: testDate, deadline: testDeadline, challengedUser: challengedUser.id, token: token })
      await wager1.save();
      await wager2.save();
      let response = await request(app)
        .get("/wagers");
      expect(response.status).toEqual(401);
    })

    test("does not return a new token", async () => {
      let wager1 = Wager({ description: "test wager1", datemade: testDate, deadline: testDeadline, challengedUser: challengedUser.id, token: token })
      let wager2 = Wager({ description: "test wager2", datemade: testDate, deadline: testDeadline, challengedUser: challengedUser.id, token: token })
      await wager1.save();
      await wager2.save();
      let response = await request(app)
        .get("/wagers");
      expect(response.body.token).toEqual(undefined);
    })
  })
});

let wager;

describe("POST, user accepting a wager", () => {
  beforeAll( async () => {
    let user1 = new User({email: "user1@test.com", username: "user1", password: "12345678!"});
		let challengedUser = new User({email: "challengerUser@test.com", username: "challengerUser", password: "98765432!"})
    wager = new Wager({peopleInvolved: [user1._id, challengedUser._id], description: "test wager", datemade: testDate, deadline: testDeadline, token: token })
    await user1.save();
		await challengedUser.save();
    await wager.save();
    console.log(`immediately after save, wager dets are ${wager}`)
    console.log(`immediately after save, wager id is ${wager._id}`)

// Sets up user and token for each test
    token = JWT.sign({
      user_id: challengedUser.id,
      // Backdate this token of 5 minutes
      iat: Math.floor(Date.now() / 1000) - (5 * 60),
      // Set the JWT token to expire in 10 minutes
      exp: Math.floor(Date.now() / 1000) + (10 * 60)
    }, secret);
  });

  // beforeEach( async () => {
  //   await Wager.deleteMany({});
  // })

  // afterAll( async () => {
  //   await User.deleteMany({});
  //   await Wager.deleteMany({});
  // })

  test("responds with a 200", async () => {
    console.log(`wager dets are currently ${wager}`)
    let response = await request(app)
      .post(`/wagers/${wager._id}/accept`)
      .set("Authorization", `Bearer ${token}`)
    expect(response.status).toEqual(200);
  });

  test("returns a new token", async () => {
    let response = await request(app)
    .post(`/wagers/${wager._id}/accept`)
    .set("Authorization", `Bearer ${token}`)
    let newPayload = JWT.decode(response.body.token, process.env.JWT_SECRET);
    let originalPayload = JWT.decode(token, process.env.JWT_SECRET);
    expect(newPayload.iat > originalPayload.iat).toEqual(true);
  });
  
  test("changes database 'approved' status to 'false'", async () => {
    await request(app)
    .post(`/wagers/${wager._id}/accept`)
    .set("Authorization", `Bearer ${token}`)
    // let updatedWager = await Wager.findById
    expect(wager.approved).toEqual(true);
  });  
})



