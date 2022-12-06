import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Person } from './Person';
import { Project } from './Project';

@Entity('task')
class Task {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  color: string;

  @ManyToOne(() => Project, (project) => project.tasks)
  project: Project;

  @OneToOne(() => Person)
  @JoinColumn({ name: 'person_id' })
  person: Person;

  @Column()
  status: string;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Task };
