import { IsEmpty, IsNotEmpty } from "class-validator";
import { User } from "src/auth/auth.schema";

export class CreateTaskDto{
    @IsNotEmpty()
    title:string;
    
    @IsNotEmpty()
    description: string;

    @IsEmpty()
    readonly user:User

}