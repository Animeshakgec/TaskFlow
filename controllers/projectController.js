const { Project } = require("../models");

exports.createProject = async (req, res) => {
    try {
        const { name, description } = req.body;
        const newProject = await Project.create({ 
            name, 
            description, 
            ownerId: req.user.id 
        });
        res.status(201).json(newProject);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.findAll({ where: { ownerId: req.user.id } });
        res.json(projects);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateProject = async (req, res) => {
    try {
        const { name, description } = req.body;
        const project = await Project.findByPk(req.params.id);
        if (!project || project.ownerId !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized" });
        }
        project.name = name;
        project.description = description;
        await project.save();
        res.json(project);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteProject = async (req, res) => {
    try {
        const project = await Project.findByPk(req.params.id);
        if (!project || project.ownerId !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized" });
        }
        await project.destroy();
        res.json({ message: "Project deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
