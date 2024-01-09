const express = require("express");
const router = express.Router();

const PubGroupsController = require("../controllers/pubGroups");

router.get("/", PubGroupsController.Index);
router.post("/:pubGroupId/addMember", PubGroupsController.UpdateAddMember)
router.post("/", PubGroupsController.Create);

// router.get("/:id", PubGroupsController.FindInfoByGroupID);


module.exports = router;
