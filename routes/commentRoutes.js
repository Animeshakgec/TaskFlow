const express = require("express");
const { addComment, getCommentsByTask } = require("../controllers/commentController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, addComment);
router.get("/:taskId", authMiddleware, getCommentsByTask);

module.exports = router;
