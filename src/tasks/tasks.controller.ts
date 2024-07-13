import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';


import { CreateTaskDto } from './dto/create-task.dto';
import { FiltersDto } from './dto/filters-dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation-pipe';

import { taskStatus } from './task-status.enum';
import { Task } from './task.schema';

@Controller('tasks')
export class TasksController {
    constructor(
        private tasksService:TasksService){}


@Get()
async getTasks():Promise<Task[]>{
    return this.tasksService.getTasks()
}
@Get('filters')
async getTasksWithFilters(@Query(ValidationPipe) filterDto:FiltersDto):Promise<Task[]>{
    return this.tasksService.getTasksWithFilters(filterDto)
}


@Get(':id')
    getTaskById(@Param('id') id:string):Promise<Task>{
        return this.tasksService.getTaskById(id);

    }

@Post()
// @UsePipes(ValidationPipe)
createTask(@Body() createTaskDto:CreateTaskDto):Promise<Task>{
    return this.tasksService.createTask(createTaskDto);

}

@Delete(':id')
    deleteTaskById(@Param('id') id:string):Promise<void>{
        return this.tasksService.deleteTaskById(id)
    }

@Patch(':id/status')
updateTaskStatus(@Param('id') id:string, @Body('status',TaskStatusValidationPipe) status:taskStatus):Promise<Task>{
    return this.tasksService.updateTaskStatus(id,status)

}

    
}
    