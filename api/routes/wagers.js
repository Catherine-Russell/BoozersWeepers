const express = require("express");
const router = express.Router();

const WagersController = require("../controllers/wagers");

router.post("/", WagersController.Create);
router.get("/", WagersController.Index);
router.get("/:id", WagersController.FindByID);

module.exports = router;
