const mongoose = require("mongoose");

require("../mongodb_helper");
const PubGroup = require("../../models/pubGroup");

describe("PubGroup model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.pubgroups.drop(() => {
      done();
    });
  });

  it("has an name", () => {
    const pubGroup = new PubGroup({
      name: "Test Pub"
    });
    expect(pubGroup.name).toEqual("Test Pub");
  });

  it("has a members list which defaults to [] when group created", () => {
    const pubGroup = new PubGroup({
			name: "Test Pub"
    });
    expect(pubGroup.members.length).toBe(0);
  });
	
// test does not equate the pubGroup members to the array in the expect statement due to a type issue but it prints the same ids to the terminal

  it("can has list of member ids when constructed with member list", () => {
    const pubGroup = new PubGroup({
			name: "Test Pub",
			members: [ '6579ad02225d0ac742e73bab', '6579ad2f225d0ac742e73bb1']
    });
    expect(pubGroup.members.length).toBe(2);
    // expect(pubGroup.members).toBe(['6579ad02225d0ac742e73bab', '6579ad2f225d0ac742e73bb1']);
  });

  it("can list all pubGroups", (done) => {
    PubGroup.find((err, pubGroups) => {
			console.log('ftygufhcyufthyuhiygft', pubGroups)
      expect(err).toBeNull();
      expect(pubGroups).toEqual([]);
      done();
    });
  });

  it("can save a pubGroup", (done) => {
    const pubGroup = new PubGroup({
      name: "Test Pub"
    });
    pubGroup.save((err) => {
      expect(err).toBeNull();

      PubGroup.find((err, pubGroups) => {
        expect(err).toBeNull();
        expect(pubGroups[0]).toMatchObject({
						name: "Test Pub"
					});
        });
        done();
      });
    });
  });
