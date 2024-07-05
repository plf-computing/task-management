import { Repository } from "typeorm";
import { Task } from "./task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { taskStatus } from "./task-status.enum";

export class taskRepository extends Repository<Task>{

   
}