const { Project, sequelize } = require("../models");
const ProjectService = require("../services/projectService.js");

exports.createProject = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const { name, description, TeamId } = req.body;
        const service = new ProjectService();

        const result = await service.createProject(name, description, TeamId, req.user.organisationId, transaction);

        if (!result.status) {
            await transaction.rollback();
            return res.status(400).json({ error: result.message });
        }

        await transaction.commit();
        res.status(201).json(result.data);
    } catch (error) {
        await transaction.rollback();
        res.status(500).json({ error: error.message });
    }
};

exports.getProjects = async (req, res) => {
    try {
        const service = new ProjectService();
        const result = await service.getProjects(req.body.TeamId);

        if (!result.status) {
            return res.status(400).json({ error: result.message });
        }

        res.json(result.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateProject = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const { name, description, TeamId } = req.body;
        const { id } = req.params;
        const service = new ProjectService();

        const result = await service.updateProject(id, name, description, TeamId, transaction);

        if (!result.status) {
            await transaction.rollback();
            return res.status(403).json({ error: result.message });
        }

        await transaction.commit();
        res.json(result.data);
    } catch (error) {
        await transaction.rollback();
        res.status(500).json({ error: error.message });
    }
};

exports.deleteProject = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const { TeamId } = req.body;
        const { id } = req.params;
        const service = new ProjectService();

        const result = await service.deleteProject(id, TeamId, transaction);

        if (!result.status) {
            await transaction.rollback();
            return res.status(403).json({ error: result.message });
        }

        await transaction.commit();
        res.json({ message: result.message });
    } catch (error) {
        await transaction.rollback();
        res.status(500).json({ error: error.message });
    }
};
