import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema()
export class User{

    @Prop({sparse:true})
   id:
   string

    @Prop()
    username:string;

    @Prop()
    password:string;

    @Prop()
    salt:string

    


   



    
}
export const UserSchema =  SchemaFactory.createForClass(User)