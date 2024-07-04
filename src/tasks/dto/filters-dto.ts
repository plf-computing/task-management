import { IsIn, IsNotEmpty, IsOptional } from "class-validator";
import { taskStatus } from "../task.model";

export class FiltersDto{
    @IsOptional()
    @IsIn([taskStatus.OPEN,taskStatus.IN_PROGRESS,taskStatus.DONE])
    status:taskStatus;

    @IsOptional()
    @IsNotEmpty()
    search:string;
}