const express = require("express");
const {
    getTaskCompletionRate,
    getActiveUsers,
    getOverdueTasks,
} = require("../controllers/analyticsController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/task-completion-rate", authMiddleware, getTaskCompletionRate);
router.get("/active-users", authMiddleware, getActiveUsers);
router.get("/overdue-tasks", authMiddleware, getOverdueTasks);

module.exports = router;
