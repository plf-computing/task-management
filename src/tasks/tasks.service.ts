import { Injectable, NotFoundException} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { FiltersDto } from './dto/filters-dto';
import { taskStatus } from './task-status.enum';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Task } from './task.schema';





@Injectable()
export class TasksService {
    constructor(
        @InjectModel(Task.name)
        private taskModel: mongoose.Model<Task>

    ){}
    

    async getTasksWithFilters(filterDto: FiltersDto): Promise<Task[]> {
        const { status, search } = filterDto;
      
        const filter: any = {};
      
        if (status) {
          filter.status = status;
        }
      
        if (search) {
          filter.$or = [
            { title: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
          ];
        }
      
        const tasks = await this.taskModel.find(filter);
      
        return tasks;
      }
    

    

   
    
    async createTask(createTaskDto:CreateTaskDto):Promise<Task>{

            const {title,description} = createTaskDto;
            
            const task = new Task();
            task.title = title;
            task.description = description;
            task.status = taskStatus.OPEN;
            await this.taskModel.create(task);
            
            
            return task;
    
    
    
    
        }
        async getTasks():Promise<Task[]>{
            const tasks = await this.taskModel.find();
            return tasks;

        }







        async getTaskById(id:string):Promise<Task>{
            const found = await this.taskModel.findById(id);
            if(!found){
                throw new NotFoundException(`task with ID "${id}"not found`)
            
                    }
            return found;
            
        }

        async deleteTaskById(id:string):Promise<void>{
            const deleted = await this.taskModel.findByIdAndDelete(id);
            

            if(!deleted){
                throw new NotFoundException(`task with ID "${id}"not found`)
                }
                
                
                

        }
       
       
        async updateTaskStatus(id:string, status:taskStatus):Promise<Task>{
            const task =  await this.getTaskById(id);
            task.status = status;
            
            await this.taskModel.findByIdAndUpdate(id,task,{
                new:true,
                runValidators:true
            });
            
            return task;
           

        }
      
    }

      
   


    

    



