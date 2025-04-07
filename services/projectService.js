import db from '../models/index.js';
const { Project } = db;

class ProjectService {
    async createProject(name, description, TeamId, OrganisationId, transaction) {
        const response = {
            status: false,
            message: '',
            data: null
        };

        try {
            const newProject = await Project.create({
                name,
                description,
                TeamId,
                OrganisationId
            }, { transaction });

            response.status = true;
            response.message = 'Project created successfully';
            response.data = newProject;
        } catch (error) {
            response.message = error.message;
        }

        return response;
    }

    async getProjects(contraint) {
        const response = {
            status: false,
            message: '',
            data: null
        };

        try {
            const where = {};

        if (constraint.teamId) {
            where.teamId = constraint.teamId;
        }

        if (constraint.organizationId) {
            where.organizationId = constraint.organizationId;
        }
            const projects = await Project.findAll({ where });

            response.status = true;
            response.message = 'Projects retrieved successfully';
            response.data = projects;
        } catch (error) {
            response.message = error.message;
        }

        return response;
    }

    async updateProject(id, name, description, TeamId, transaction) {
        const response = {
            status: false,
            message: '',
            data: null
        };

        try {
            const project = await Project.findByPk(id, { transaction });
            if (!project || project.TeamId !== TeamId) {
                response.message = 'Unauthorized';
                return response;
            }

            project.name = name;
            project.description = description;
            await project.save({ transaction });

            response.status = true;
            response.message = 'Project updated successfully';
            response.data = project;
        } catch (error) {
            response.message = error.message;
        }

        return response;
    }

    async deleteProject(id, TeamId, transaction) {
        const response = {
            status: false,
            message: '',
            data: null
        };

        try {
            const project = await Project.findByPk(id, { transaction });
            if (!project || project.TeamId !== TeamId) {
                response.message = 'Unauthorized';
                return response;
            }

            await project.destroy({ transaction });

            response.status = true;
            response.message = 'Project deleted successfully';
        } catch (error) {
            response.message = error.message;
        }

        return response;
    }
}

export default ProjectService;
