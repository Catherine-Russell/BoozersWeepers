const express = require("express");
const router = express.Router();

const PintsController = require("../controllers/pints");

router.get("/", PintsController.index);
router.post("/", PintsController.create);
router.get("/:id", PintsController.FindByID);

module.exports = router;
