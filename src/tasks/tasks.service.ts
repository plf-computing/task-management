import { Injectable, NotFoundException} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { FiltersDto } from './dto/filters-dto';
import { taskStatus } from './task-status.enum';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Task } from './task.schema';
import { User } from 'src/auth/auth.schema';





@Injectable()
export class TasksService {
    constructor(
        @InjectModel(Task.name)
        private taskModel: mongoose.Model<Task>

    ){}
    
    async getTasks(user:User):Promise<Task[]>{
        const filter: any = {};
      
        if (user) {
          filter.user= user;
        }
        const tasks = await this.taskModel.find(filter);
        return tasks;

    }

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
    

    

   
    
    async createTask(
        createTaskDto:CreateTaskDto,
        user:User
    ):Promise<Task>{
        
        
            const {title,description} = createTaskDto;
            
            const task = new Task();
            task.title = title;
            task.description = description;
            task.status = taskStatus.OPEN;
            task.user = user;
            
            await this.taskModel.create(task);
            delete task.user
            
            
            return task;
    
    
    
    
        }
        

        async getTaskById(id: string, user:User): Promise<Task> {
          if (user) {
            const found = await this.taskModel.findOne({ _id: id,user })
            if (!found) {
              throw new NotFoundException(`task with ID "${id}" and user ID "${user}" not found`)
            }
            return found
          }
        }
      




       

        async deleteTaskById(id:string,user:User):Promise<void>{
            const deleted = await this.taskModel.findByIdAndDelete({_id:id,user});
            

            if(!deleted){
                throw new NotFoundException(`task with ID "${id}"not found`)
                }
                
                
                

        }
       
       
        async updateTaskStatus(id:string, status:taskStatus,user:User):Promise<Task>{
            const task =  await this.getTaskById(id,user);
            task.status = status;
            
            await this.taskModel.findByIdAndUpdate(id,task,{
                new:true,
                runValidators:true
            });
            
            return task;
           

        }
      
    }

      
   


    

    



