import { Document } from 'mongoose';

export enum TaskStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export class Task {
  title: string;
  desc: string;
  status: TaskStatus;
}

export interface TaskInterface extends Document {
  readonly title: string;
  readonly desc: string;
  readonly status: TaskStatus;
}
