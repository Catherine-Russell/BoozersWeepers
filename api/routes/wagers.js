const express = require("express");
const router = express.Router();

const WagersController = require("../controllers/wagers");

router.get("/:id", WagersController.FindByID);
router.get("/", WagersController.Index);
router.post("/", WagersController.Create);
router.post("/:wager_id/accept", WagersController.Accept);


module.exports = router;
