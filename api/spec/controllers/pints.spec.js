const app = require("../../app");
const request = require("supertest");
require("../mongodb_helper");
const Pint = require('../../models/pint');
const JWT = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

let token;

describe("/pint", () => {
  beforeAll(async () => {
    let pint1 = new Pint({
      owner: "65784bb12edaba69155c7499",
      owed_by: "6578763c46f16876f89eb670",
      bet: "659b1a34cb2b5b84a3e2b577",
    });
    await pint1.save();
    token = JWT.sign(
      {
        // Backdate this token of 5 minutes
        iat: Math.floor(Date.now() / 1000) - 5 * 60,
        // Set the JWT token to expire in 10 minutes
        exp: Math.floor(Date.now() / 1000) + 10 * 60,
      },
      secret
    );
  });

  beforeEach(async () => {
    await Pint.deleteMany({});
  });

  afterEach(async () => {
    await Pint.deleteMany({});
  });

  describe("POST, to / ", () => {
    test("response from /", async () => {
      let response = await request(app)
        .post("/pints")
      expect(response.statusCode).not.toBe(404);
    });
  });

  describe("GET, to / ", () => {
    test("response from /", async () => {
      let response = await request(app)
        .get("/pints")
      expect(response.statusCode).not.toBe(404);
    });
  });

  describe("GET, to /ID ", () => {
    test("response from /ID", async () => {
      let response = await request(app)
        .get("/pints/123456789")
      expect(response.statusCode).not.toBe(404);
    });
  });

  describe("POST, to claim/ID ", () => {
    test("response from /ID", async () => {
      let response = await request(app)
        .post("/pints/claim/123456789")
      expect(response.statusCode).not.toBe(404);
    });
  });

  describe("GET, to wallet/123456 ", () => {
    test("response from /ID", async () => {
      let response = await request(app)
        .get("/pints/wallet/123456789")
      expect(response.statusCode).not.toBe(404);
    });
  });

});


