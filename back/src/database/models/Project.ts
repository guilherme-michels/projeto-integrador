import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Person } from './Person';

@Entity('project')
class Project {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  name: string;

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
