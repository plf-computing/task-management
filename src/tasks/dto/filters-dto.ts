import { taskStatus } from "../task.model";

export class FiltersDto{
    status:taskStatus;
    search:string;
}