import { Injectable } from '@nestjs/common';
import { Task, TaskInterface, TaskStatus } from './task.entity';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel('Task')
    private readonly taskModel: Model<TaskInterface>,
  ) {}
  async getAllTasks(): Promise<Task[]> {
    const tasks = await this.taskModel.find();
    return tasks;
  }
  async getTaskById(id: string): Promise<Task> {
    const task = await this.taskModel.findById(id);
    return task;
  }
  async createTask(newTask: CreateTaskDto): Promise<Task> {
    const task = new this.taskModel({ status: TaskStatus.PENDING, ...newTask });
    return await task.save();
  }
  async deleteTask(id: string): Promise<Task> {
    const deletedTask = await this.taskModel.findByIdAndDelete(id);
    return deletedTask;
  }
  async updateTask(id: string, updatedTask: UpdateTaskDto): Promise<Task> {
    const task = await this.taskModel.findByIdAndUpdate(id, updatedTask, {
      new: true,
    });
    return task;
  }
}
