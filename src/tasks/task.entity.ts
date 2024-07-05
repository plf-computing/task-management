import { Column, Entity, ObjectIdColumn,} from "typeorm";
import { taskStatus } from "./task-status.enum";

@Entity()
export class Task {
   
    @ObjectIdColumn()
    id:string;

    @Column()
    title:string;

    @Column()
    description:string;

    @Column()
    status:taskStatus

}