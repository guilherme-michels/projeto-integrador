import { Column, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('team')
class Team {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  team_name: string;

  @Column()
  sector: string;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Team };
