const express = require("express");
const { getActivityLogsByTask } = require("../controllers/activityLogController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/:taskId", authMiddleware, getActivityLogsByTask);

module.exports = router;
