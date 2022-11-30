import { Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Project } from './Project';
import { Person } from './Person';

@Entity('project-users')
class ProjectUsers {
  @PrimaryColumn()
  readonly id: string;

  @OneToOne(() => Project)
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @OneToOne(() => Person)
  @JoinColumn({ name: 'person_id' })
  person: Person;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { ProjectUsers };
