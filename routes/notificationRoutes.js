const express = require("express");
const { getUserNotifications, markAsRead } = require("../controllers/notificationController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, getUserNotifications);
router.put("/:id", authMiddleware, markAsRead);

module.exports = router;
