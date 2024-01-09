const express = require("express");
const router = express.Router();

const WagersController = require("../controllers/wagers");

router.post("/:wager_id/accept", WagersController.Accept);
router.get("/:id", WagersController.FindByID);
router.get("/", WagersController.Index);
router.post("/:wager_id/accept", WagersController.Accept);
router.post("/updateWinner/:wagerID/:winnerID", WagersController.UpdateWinner);
router.post("/", WagersController.Create);
router.post("/:wager_id/cancel", WagersController.Cancel);



module.exports = router;
