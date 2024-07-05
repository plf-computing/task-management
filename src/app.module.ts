import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './tasks/task.entity';



@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mongodb',
    host:'localhost',
    port:27017,
    database:process.env.DATABASE,
    synchronize:true,
    useUnifiedTopology:true,
    entities:[Task]

  })
    ,TasksModule],
  
})
export class AppModule {}
