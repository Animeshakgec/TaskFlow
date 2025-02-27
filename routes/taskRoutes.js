const express = require("express");
const { createTask, getTasksByProject, updateTask, deleteTask } = require("../controllers/taskController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();
router.post("/", authMiddleware, createTask);
router.get("/:projectId", authMiddleware, getTasksByProject);
router.put("/:id", authMiddleware, updateTask);
router.delete("/:id", authMiddleware, deleteTask);

module.exports = router;
