export enum TaskStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export class Task {
  id: string;
  title: string;
  desc: string;
  status: TaskStatus;
}