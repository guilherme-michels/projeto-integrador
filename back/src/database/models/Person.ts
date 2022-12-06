import { Column, Entity, ManyToMany, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('person')
class Person {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  telefone: string;

  @Column()
  cargo: string;

  @Column()
  password: string;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Person };
