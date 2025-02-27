const express = require("express");
const { createProject, getProjects, updateProject, deleteProject } = require("../controllers/projectController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

const router = express.Router();
router.post("/", authMiddleware,roleMiddleware(["admin"]), createProject);
router.get("/", authMiddleware,roleMiddleware(["admin", "developer", "viewer"]), getProjects);
router.put("/:id", authMiddleware,roleMiddleware(["admin"]), updateProject);
router.delete("/:id", authMiddleware,roleMiddleware(["admin"]), deleteProject);

module.exports = router;
