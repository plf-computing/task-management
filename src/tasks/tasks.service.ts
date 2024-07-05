import { Injectable, NotFoundException, Search } from '@nestjs/common';


import { CreateTaskDto } from './dto/create-task.dto';
import { FiltersDto } from './dto/filters-dto';


import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { ObjectId, Repository } from 'typeorm';
import { taskStatus } from './task-status.enum';



@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>

    ){}
    


    // private tasks:Task[] = [];

    // getAllTasks():Task[]{
    //     return this.tasks; 
    // }

    // getTasksWithFilters(filterDto:FiltersDto):Task[]{
      
    //     const { status, search } = filterDto;

    //     let tasks = this.getAllTasks();
    //     if(status){
    //         tasks = tasks.filter(task=> task.status === status)
    //     }
    //     if(search){
    //         tasks = tasks.filter(task =>
    //             task.title.includes(search)||
    //             task.description.includes(search)

    //         )

    //     }
    //     return tasks;

    // }

    async getTaskById(id:string):Promise<Task>{
        const found = await this.taskRepository.findOneBy({id:id});
        if(!found){
            throw new NotFoundException(`task with ID "${id}"not found`)
        
                }
        return found;
        
    }
    
    async createTask(createTaskDto:CreateTaskDto):Promise<Task>{

            const {title,description} = createTaskDto;
            
            const task = new Task();
            task.title = title;
            task.description = description;
            task.status = taskStatus.OPEN;
            await this.taskRepository.save(task);
            
            
            return task;
    
    
    
    
        }

        async deleteTaskById(id:string):Promise<void>{
            const deleted = await this.taskRepository.delete(id);

            if(deleted.affected === 0){
                throw new NotFoundException(`task with ID "${id}"not found`)
                }
                

        }
       
        async updateTaskStatus(id:string, status:taskStatus):Promise<Task>{
            const task =  await this.getTaskById(id);
            task.status = status;
            
            await this.taskRepository.save(task);
            
            return task;
           

        }
      
    }

      
   


    

    



