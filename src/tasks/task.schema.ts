

import mongoose from "mongoose";
import { taskStatus } from "./task-status.enum";
import { Prop, Schema ,SchemaFactory } from "@nestjs/mongoose";

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

}
export const TaskSchema = SchemaFactory.createForClass(Task)