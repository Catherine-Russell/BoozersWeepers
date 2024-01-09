const mongoose = require("mongoose");

require("../mongodb_helper");
const Pint = require("../../models/pint");
const testDate = new Date("2022-03-25");

describe("Pint model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.pints.drop(() => {
      done();
    });
  });

  it("has an owner", () => {
    const pintData = {
      owner: "65784bb12edaba69155c7499",
      datemade: testDate,
      owed_by: "6578763c46f16876f89eb670",
      bet: "659b1a34cb2b5b84a3e2b577",
      claimed: false,
    };
    const pint = new Pint(pintData);
    expect(pint.owner).toBeDefined();
  }); 

  it("is owed by a user", () => {
    const pintData = {
      owner: "65784bb12edaba69155c7499",
      datemade: testDate,
      owed_by: "6578763c46f16876f89eb670",
      bet: "659b1a34cb2b5b84a3e2b577",
      claimed: false,
    };
    const pint = new Pint(pintData);
    expect(pint.owed_by).toBeDefined();
  });

  it("has a bet ID", () => {
    const pintData = {
      owner: "65784bb12edaba69155c7499",
      datemade: testDate,
      owed_by: "6578763c46f16876f89eb670",
      bet: "659b1a34cb2b5b84a3e2b577",
      claimed: false,
    };
    const pint = new Pint(pintData);
    expect(pint.bet).toBeDefined();
  });

  it("is not claimed", () => {
    const pintData = {
      owner: "65784bb12edaba69155c7499",
      datemade: testDate,
      owed_by: "6578763c46f16876f89eb670",
      bet: "659b1a34cb2b5b84a3e2b577",
      claimed: false,
    };
    const pint = new Pint(pintData);
    expect(pint.claimed).toBeDefined();
  });

  it("is not claimed", () => {
    const pintData = {
      owner: "65784bb12edaba69155c7499",
      datemade: testDate,
      owed_by: "6578763c46f16876f89eb670",
      bet: "659b1a34cb2b5b84a3e2b577",
      claimed: false,
    };
    const pint = new Pint(pintData);
    expect(pint.claimed).toBeDefined();
  });
});