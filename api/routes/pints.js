const express = require("express");
const router = express.Router();

const PintsController = require("../controllers/pints");

router.get("/", PintsController.index);
router.post("/", PintsController.create);
router.get("/:id", PintsController.FindByID);
router.post("/claim/:id", PintsController.SwitchClaimedToTrue);
router.get("/wallet/:owner_id", PintsController.FindAllOwnedPints);

module.exports = router;
