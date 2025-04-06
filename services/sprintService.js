import db from '../models';
const { Project , Sprint , Task} = db;

class SprintService{
   async createSprint(name, description, startDate, endDate, projectId){
       let response = {
           status: false,
           message: '',
           data: null
       }

       try {

           const newSprint = await Sprint.create({ 
               name, 
               description, 
               startDate,
               endDate,
               projectId
           },{transaction: this.transaction});

           response.status = true;
           response.message = 'Sprint created successfully';
           response.data = newSprint;
       } catch (error) {
           await this.rollback();
           response.message = error.message;
       }
       return response;
   }
   async getSprints(projectId){
       let response = {
           status: false,
           message: '',
           data: null
       }

       try {
           const sprints = await Sprint.findAll({ where: { projectId } });

           response.message = 'Sprints retrieved successfully';
           response.status = true;
           response.data = sprints;
       } catch (error) {
           response.message = error.message;
       }
       return response;
   }
   async updateSprint(id, name, description, startDate, endDate, projectId){
       let response = {
           status: false,
           message: '',
           data: null
       }

       try {
           const sprint = await Sprint.findByPk(id);
           if (!sprint || sprint.projectId !== projectId) {
               response.message = 'Unauthorized';
           }else{
               sprint.name = name;
               sprint.description = description;
               sprint.startDate = startDate;
               sprint.endDate = endDate;

               await sprint.save({transaction: this.transaction});
               response.status = true;
               response.message = 'Sprint updated successfully';
               response.data = sprint;
           }
       } catch (error) {
              await this.rollback();
           response.message = error.message;
       }
       return response;
   }
   async deleteSprint(id, projectId){
       let response = {
           status: false,
           message: '',
           data: null
       }

       try {
           const sprint = await Sprint.findByPk(id);
           if (!sprint || sprint.projectId !== projectId) {
               response.message = 'Unauthorized';
           }else{
               await sprint.destroy({transaction: this.transaction});
               response.status = true;
               response.message = 'Sprint deleted successfully';
           }
       } catch (error) {
              await this.rollback();
           response.message = error.message;
       }
       return response;
   }
}