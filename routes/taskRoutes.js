const express = require("express");
const { createTask, getTasksByProject, updateTask, deleteTask } = require("../controllers/taskController");
const {authenticateUser } = require("../middleware/authMiddleware");

const router = express.Router();
router.post("/", authenticateUser , createTask);
router.get("/:projectId", authenticateUser , getTasksByProject);
router.put("/:id", authenticateUser , updateTask);
router.delete("/:id", authenticateUser , deleteTask);

module.exports = router;
