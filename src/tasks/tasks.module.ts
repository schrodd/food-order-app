import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { MongooseModule } from '@nestjs/mongoose'
import { TaskSchema } from  './schemas/tasks.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: 'Task', schema: TaskSchema}
    ])
  ],
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule {}
