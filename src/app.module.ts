import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';


import { MongooseModule } from '@nestjs/mongoose';



@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/taskdb'),
    TasksModule



    
  ],
  
})
export class AppModule {}
