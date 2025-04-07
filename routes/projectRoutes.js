const express = require("express");
const { createProject, getProjects, updateProject, deleteProject } = require("../controllers/projectController");
const {authenticateUser , authorizeRoles} = require("../middleware/authMiddleware.js");

const router = express.Router();
router.post("/", authenticateUser ,authorizeRoles(["admin"]), createProject);
router.get("/", authenticateUser ,authorizeRoles(["admin", "developer", "viewer"]), getProjects);
router.put("/:id", authenticateUser ,authorizeRoles(["admin"]), updateProject);
router.delete("/:id", authenticateUser ,authorizeRoles(["admin"]), deleteProject);

module.exports = router;
