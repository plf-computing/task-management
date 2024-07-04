import { Injectable, NotFoundException, Search } from '@nestjs/common';
import { Task, taskStatus } from './task.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { FiltersDto } from './dto/filters-dto';

@Injectable()
export class TasksService {
    private tasks:Task[] = [];

    getAllTasks():Task[]{
        return this.tasks; 
    }

    getTasksWithFilters(filterDto:FiltersDto):Task[]{
      
        const { status, search } = filterDto;

        let tasks = this.getAllTasks();
        if(status){
            tasks = tasks.filter(task=> task.status === status)
        }
        if(search){
            tasks = tasks.filter(task =>
                task.title.includes(search)||
                task.description.includes(search)

            )

        }
        return tasks;

    }

    getTaskById(id:string):Task{
        const found = this.tasks.find(task =>task.id === id);
        if(!found){
            throw new NotFoundException(`task with ID "${id}"not found`)

        }
        return found;

    }
    // deleteTaskById(id: string): Task | undefined {
    //     const taskIndex = this.tasks.findIndex(task => task.id === id);
    //     if (taskIndex !== -1) {
    //         const deletedTask = this.tasks.splice(taskIndex, 1)[0];
    //         return deletedTask;
    //     }
    //     return undefined;
    // }
    deleteTaskById(id:string):void{
    this.tasks =this.tasks.filter(task => task.id !== id)
        
        
    }

   


    createTask(createTaskDto:CreateTaskDto):Task{
        const { title,description}=createTaskDto;


        const task: Task={
            id:uuidv4(),
            title,
            description,
            status:taskStatus.OPEN,

        };
        this.tasks.push(task);
        return task;

    }

    updateTaskStatus(id:string, status:taskStatus):Task{
        const UpdatedTask = this.getTaskById(id);
        UpdatedTask.status=status;
        return UpdatedTask;

    }
}


