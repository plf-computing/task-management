import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';


import { CreateTaskDto } from './dto/create-task.dto';
import { FiltersDto } from './dto/filters-dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation-pipe';

import { taskStatus } from './task-status.enum';
import { Task } from './task.schema';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/auth.schema';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor(
        private tasksService:TasksService){}


@Get()

async getTasks(@GetUser() user:User):Promise<Task[]>{
    return this.tasksService.getTasks(user)
}
@Get('filters')
async getTasksWithFilters(@Query(ValidationPipe) filterDto:FiltersDto):Promise<Task[]>{
    return this.tasksService.getTasksWithFilters(filterDto)
}


@Get(':id')
    getTaskById(
        @GetUser() user:User,@Param('id') id:string):Promise<Task| Task[]>{
        return this.tasksService.getTaskById(id,user);

    }

@Post()
// @UsePipes(ValidationPipe)
createTask(
    @Body() createTaskDto:CreateTaskDto,
    @GetUser() user:User,
):Promise<Task>{
    return this.tasksService.createTask(createTaskDto, user);

}

@Delete(':id')
    deleteTaskById(@GetUser() user:User,@Param('id') id:string):Promise<void>{
        return this.tasksService.deleteTaskById(id,user)
    }

@Patch(':id/status')
updateTaskStatus(@GetUser() user:User,@Param('id') id:string, @Body('status',TaskStatusValidationPipe) status:taskStatus):Promise<Task|Task[]>{
    return this.tasksService.updateTaskStatus(id,status,user)

}

    
}
    