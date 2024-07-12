import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';


import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';



@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:'.env',
      isGlobal: true
    }),  
    MongooseModule.forRoot(process.env.DB_URI),
    TasksModule



    
  ],
  
})
export class AppModule {}
