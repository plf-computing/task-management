

import mongoose from "mongoose";
import { taskStatus } from "./task-status.enum";
import { Prop, Schema ,SchemaFactory } from "@nestjs/mongoose";
import { User } from "src/auth/auth.schema";

@Schema({
    timestamps: true,

})
export class Task {
   
    @Prop()
    id: mongoose.Schema.Types.ObjectId

    @Prop()
    title:string;

    @Prop()
    description:string;

    @Prop()
    status:taskStatus

    // @Prop({type:mongoose.Schema.Types.ObjectId,ref:'User'})
    // user:User

}
export const TaskSchema = SchemaFactory.createForClass(Task)