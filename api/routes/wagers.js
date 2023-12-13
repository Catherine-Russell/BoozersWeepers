const express = require("express");
const router = express.Router();

const WagersController = require("../controllers/wagers");

router.post("/", WagersController.Create);

module.exports = router;
