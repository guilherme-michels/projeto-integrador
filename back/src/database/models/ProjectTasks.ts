import { Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Project } from './Project';
import { Task } from './Task';

@Entity('project-tasks')
class ProjectTasks {
  @PrimaryColumn()
  readonly id: string;

  @OneToOne(() => Project)
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @OneToOne(() => Task)
  @JoinColumn({ name: 'task_id' })
  task: Task;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { ProjectTasks };
