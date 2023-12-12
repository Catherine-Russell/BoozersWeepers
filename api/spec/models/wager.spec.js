const app = require("../../app");
const mongoose = require("mongoose");

require("../mongodb_helper");
const Wager = require('../../models/wager')
const testDate = new Date("2022-03-25");



describe("wager model", () =>{
  beforeEach((done) => {
    mongoose.connection.collections.wagers.drop(() => {
      done();
    });
  });
  it("creates a wager with two people", () => {
    const wager = new Wager({
      peopleInvolved:["65784c406fc0bb57df3dde04", "657873ecd1d828674360e3dc"],
      quantity: 1,
      description: "test Wager",
      datemade: testDate, 
      deadline: testDate, 
    });
    expect(wager.description).toEqual("test Wager");

  });
  it("creates a wager with correct defaults", () => {
    const wager = new Wager({
      quantity: 1,
      description: "test Wager",
      datemade: testDate, 
      deadline: testDate, 
    });
    expect(wager.winner).toEqual(null);

   

  });
  it("creates a wager with correct time", () => {
    const wager = new Wager({
      quantity: 1,
      description: "test Wager",
      datemade: testDate, 
      deadline: testDate, 
    });
    expect(wager.deadline).toEqual(testDate);
    
   

  });





})