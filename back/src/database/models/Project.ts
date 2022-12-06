import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Person } from './Person';
import { Task } from './Task';

@Entity('project')
class Project {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  name: string;

  @OneToMany(() => Task, (task) => task.project)
  tasks: Task[];

  @ManyToMany(() => Person)
  @JoinTable()
  persons: Person[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Project };
