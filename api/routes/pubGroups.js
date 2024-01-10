const express = require("express");
const router = express.Router();

const PubGroupsController = require("../controllers/pubGroups");

router.get("/:pubGroupId", PubGroupsController.FindMemberInfoByPubGroupID);
router.get("/", PubGroupsController.Index);
router.post("/:pubGroupId/addMember", PubGroupsController.UpdateAddMember)
router.post("/:pubGroupId/removeMember", PubGroupsController.UpdateRemoveMember)
router.post("/", PubGroupsController.Create);

module.exports = router;
