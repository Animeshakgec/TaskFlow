import db from '../models';
const { Project , Sprint , Task , Tag} = db;
class TaskService {
    async createTask(title, description,status,priority, assignedType,assignedTo,position ,projectId, sprintId ,tags=[]){
        let response = {
            status: false,
            message: '',
            data: null
        }

        try {
            const newTask = await Task.create({ 
                title, 
                description,
                status,
                priority, 
                assignedType,
                assignedTo,
                position ,
                projectId, 
                sprintId
            },{transaction: this.transaction});

            // Attach tags
            if (tags.length > 0) {
                for(const tag of tags){
                    await newTask.createTag({ title: tag }, {transaction: this.transaction});    
                } 
            }

            response.status = true;
            response.message = 'Task created successfully';
            response.data = newTask;
        } catch (error) {
            await this.rollback();
            response.message = error.message;
        }
        return response;
    }
    async getTasks(projectId){
        let response = {
            status: false,
            message: '',
            data: null
        }

        try {
            const tasks = await Task.findAll({ where: { projectId } });

            response.message = 'Tasks retrieved successfully';
            response.status = true;
            response.data = tasks;
        } catch (error) {
            response.message = error.message;
        }
        return response;
    }
    async updateTask(id, title, description,status,priority, assignedType,assignedTo,position ,projectId, sprintId ,tags=[]){
        let response = {
            status: false,
            message: '',
            data: null
        }

        try {
            const task = await Task.findByPk(id);
            if (!task || task.projectId !== projectId) {
                response.message = 'Unauthorized';
            }else{
                task.title = title || task.title;
                task.description = description || task.description;
                task.status = status || task.status;
                task.priority = priority || task.priority;
                task.assignedType = assignedType || task.assignedType;
                task.assignedTo = assignedTo || task.assignedTo;
                task.position = position !== undefined ? position : task.position;
                task.sprintId = sprintId || task.sprintId;

                await task.save();

                //update tags
                if (tags.length > 0) {
                    // Delete all previous tags
                    await task.removeTags();

                    // Attach new tags
                    for(const tag of tags){
                        await task.createTag({ title: tag }, {transaction: this.transaction});    
                    } 
                }

                response.status = true;
                response.message = 'Task updated successfully';
                response.data = task;
            }
        } catch (error) {
            response.message = error.message;
        }
        return response;
    }
    async deleteTask(id, projectId){
        let response = {
            status: false,
            message: '',
            data: null
        }

        try {
            const task = await Task.findByPk(id);
            if (!task || task.projectId !== projectId) {
                response.message = 'Unauthorized';
            }else{
                await task.destroy();

                response.status = true;
                response.message = 'Task deleted successfully';
            }
        } catch (error) {
            response.message = error.message;
        }
        return response;
    }
    // async addCommentToTasks(id,projectId){
    //     let response = {
    //         status: false,
    //         message: '',
    //         data: null
    //     }
    //     try {
    //         const task = await Task.findByPk(id);
    //         if (!task || task.projectId !== projectId) {
    //             response.message = 'Unauthorized';
    //         }
    //         else{

    //         }
    //     catch (error) {
            
    //     }
    // }
}