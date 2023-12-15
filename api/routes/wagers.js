const express = require("express");
const router = express.Router();

const WagersController = require("../controllers/wagers");

router.get("/:id", WagersController.FindByID);
router.get("/", WagersController.Index);
router.post("/:wager_id/accept", WagersController.Accept);
router.post("/updateWinner/:wagerID/:winnerID", WagersController.UpdateWinner);
router.post("/", WagersController.Create);


module.exports = router;
