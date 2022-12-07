import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Person } from './Person';

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

  @Column({ name: 'project_id' })
  projectId: string;

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
