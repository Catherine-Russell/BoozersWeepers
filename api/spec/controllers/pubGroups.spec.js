const app = require("../../app");
const request = require("supertest");
require("../mongodb_helper");
const User = require('../../models/user');
const PubGroup = require('../../models/pubGroup');

const JWT = require("jsonwebtoken");
const { purge } = require("superagent");
const secret = process.env.JWT_SECRET;

let user
let token

describe("/pubgroup ", () => {
  beforeAll( async () => {
    user = new User({email: "user@test.com", username: "user", password: "12345678!"});
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
        .post("/pubGroups")
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

// Tests for Index function:
describe("Index function returns all groups in the database", () => {
  test("returns every pubGroup in the collection", async () => {
    let pubGroup1 = PubGroup({ name: "test group 1"})
    let pubGroup2 = PubGroup({ name: "test group 2"})
    await pubGroup1.save();
    await pubGroup2.save();
    let response = await request(app)
      .get("/pubGroups")
      .set("Authorization", `Bearer ${token}`)
      .send({token: token});
    let pubGroupNames = response.body.pubGroups.map((pubGroups) => ( pubGroups.name ));
    expect(pubGroupNames).toEqual(["test group 1", "test group 2"]);
  })


  test("the response code is 200", async () => {
    let pubGroup1 = PubGroup({ name: "test group 1"})
    let pubGroup2 = PubGroup({ name: "test group 2"})
    await pubGroup1.save();
    await pubGroup2.save();

    let response = await request(app)
      .get("/pubGroups")
      .set("Authorization", `Bearer ${token}`)
      .send({token: token});
    expect(response.status).toEqual(200);
  })


  test("returns a new token", async () => {
    let pubGroup1 = PubGroup({ name: "test group 1"})
    let pubGroup2 = PubGroup({ name: "test group 2"})
    await pubGroup1.save();
    await pubGroup2.save();

    let response = await request(app)
      .get("/pubGroups")
      .set("Authorization", `Bearer ${token}`)
      .send({token: token});
    let newPayload = JWT.decode(response.body.token, process.env.JWT_SECRET);
    let originalPayload = JWT.decode(token, process.env.JWT_SECRET);
    expect(newPayload.iat > originalPayload.iat).toEqual(true);
  })
})

// TESTS for adding a new member
  describe("adding a new member adds their id to the members array", () => {
    test("server response is 200 when member successfully added", async () => {
      let pubGroup = new PubGroup({name: "Test Group"});
      await pubGroup.save();
      let response = await request(app)
    	  .post(`/pubGroups/${pubGroup._id}/addMember/`)
        .set("Authorization", `Bearer ${token}`)
      expect(response.status).toEqual(200);
    });

    test("first member appears in list", async () => {
      let pubGroup = new PubGroup({name: "Test Group"});
      await pubGroup.save();
      await request(app)
        .post(`/pubGroups/${pubGroup._id}/addMember/`)
        .set("Authorization", `Bearer ${token}`)
			let pubGroups = await PubGroup.find();
      expect(pubGroups[0].members[0]).toEqual(user._id);
    })
  
    test("multiple members added appear in list", async () => {
      const user2 = new User({email: "user2@test.com", username: "user2", password: "12345678!"});
      const user3 = new User({email: "user3@test.com", username: "user3", password: "12345678!"});
      await user2.save();
      await user3.save();

      let pubGroup = new PubGroup({name: "Test Group", members: [user2._id, user3._id]});
      await pubGroup.save();
      await request(app)
        .post(`/pubGroups/${pubGroup._id}/addMember/`)
        .set("Authorization", `Bearer ${token}`)
			let pubGroups = await PubGroup.find();
      expect(pubGroups[0].members[0]).toEqual(user2._id);
      expect(pubGroups[0].members[1]).toEqual(user3._id);
      expect(pubGroups[0].members[2]).toEqual(user._id);

    });
});
});



// NEW test suite to set up users and pub groups properly in the before all
let testPubGroup

describe("POST /pubgroup -> creates a new wager", () => {
  beforeAll( async () => {
    // Sets up user and token for each test
    const user1 = new User({email: "user1@test.com", username: "user", password: "12345678!"});
    const user2 = new User({email: "user2@test.com", username: "user2", password: "12345678!"});
    const user3 = new User({email: "user3@test.com", username: "user3", password: "12345678!"});
    await user1.save();
    await user2.save();
    await user3.save();

    token = JWT.sign({
      user_id: user1.id,
      // Backdate this token of 5 minutes
      iat: Math.floor(Date.now() / 1000) - (5 * 60),
      // Set the JWT token to expire in 10 minutes
      exp: Math.floor(Date.now() / 1000) + (10 * 60)
    }, secret);
    
    testPubGroup = new PubGroup({name: "Test Pub Group", members: [user1._id, user2._id, user3._id]});
    await testPubGroup.save();

  });

  afterAll( async () => {
    await User.deleteMany({});
    await PubGroup.deleteMany({});
  })
  
  // Test for getting the information about members by pubGroup id
  describe("gets information about members in a group from the pubGroup id", () => {
    test("returns a list of member objects", async () => {
      console.log('THIS IS THE NEW TEST AND THE PUBGROUP ID IS:', testPubGroup._id)
      let response = await request(app)
      .get(`/pubGroups/${testPubGroup._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({token: token});
      expect(response.status).toEqual(200);
    });
    
  });
});

// NOW WRITE THE TEST BUT CHECKING THAT THE OBJECTS FOR MEMBERS ARE SAME AS THE USER123 thing
// async () => {
//   let response = await request(app)
//     .get("/userdata")
//     .set("Authorization", `Bearer ${token}`)
//     .send({token: token});
//   let usernames= response.body.users.map((user) => ( user.username ));
//   expect(usernames).toEqual(["mrstest", "mrtest"]);