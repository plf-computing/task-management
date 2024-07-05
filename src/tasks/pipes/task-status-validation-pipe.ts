import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { taskStatus } from "../task-status.enum";

export class TaskStatusValidationPipe implements PipeTransform{
    readonly allowedStatuses= [
        taskStatus.OPEN,
        taskStatus.IN_PROGRESS,
        taskStatus.DONE
        

    ];
    
    transform(value:any){
        value = value.toUpperCase();
        if(!this.statusIsValid(value)){
            throw new BadRequestException(`"${value}"is an invalid status`)
        }
        return value;

    }

    private statusIsValid(status:any){
        const index = this.allowedStatuses.indexOf(status);
        return index !== -1;
        }
}