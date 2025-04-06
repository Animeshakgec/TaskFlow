import db from '../models';
const { Project } = db;

class ProjectService{
    async createProject(name, description, TeamId){
        let response = {
            status: false,
            message: '',
            data: null
        }

        try {

            const newProject = await Project.create({ 
                name, 
                description, 
                TeamId,
                OrganisationId: this.org.id
            }, { transaction: this.transaction });

            response.status = true;
            response.message = 'Project created successfully';
            response.data = newProject;
        } catch (error) {
            // throw new Error(error.message);
            await this.rollback(); 
            response.message = e.message;
        }
        return response;
    }
    async getProjects(TeamId){
        let response = {
            status: false,
            message: '',
            data: null
        }

        try {
            const projects = await Project.findAll({ where: { TeamId } });

            response.message = 'Projects retrieved successfully';
            response.status = true;
            response.data = projects;
        } catch (error) {
            response.message = error.message;
        }
        return response;
    }
    async updateProject(id, name, description, TeamId){
        let response = {
            status: false,
            message: '',
            data: null
        }

        try {
            const project = await Project.findByPk(id, { transaction: this.transaction });
            if (!project || project.TeamId !== TeamId) {
                response.message = 'Unauthorized';
            }else{
                project.name = name;
                project.description = description;
                await project.save();

                response.status = true;
                response.message = 'Project updated successfully';
                response.data = project;
            }
        } catch (error) {
            await this.rollback();
            response.message = error.message;
        }
        return response;
    }
    async deleteProject(id, TeamId){
        let response = {
            status: false,
            message: '',
            data: null
        }

        try {
            const project = await Project.findByPk(id, { transaction: this.transaction });
            if (!project || project.TeamId !== TeamId) {
                response.message = 'Unauthorized';
            }else{
                await project.destroy();
                response.status = true;
                response.message = 'Project deleted successfully';
            }
        } catch (error) {
            await this.rollback();
            response.message = error.message;
        }
        return response;
    }
}