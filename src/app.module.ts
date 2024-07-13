import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';


import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';



@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:'.env',
      isGlobal: true
    }),  
    MongooseModule.forRoot(process.env.DB_URI),
    TasksModule,
    AuthModule



    
  ],
  
})
export class AppModule {}
