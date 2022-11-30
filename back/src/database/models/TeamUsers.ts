import { Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Team } from './Team';
import { Person } from './Person';

@Entity('team-users')
class TeamUsers {
  @PrimaryColumn()
  readonly id: string;

  @OneToOne(() => Team)
  @JoinColumn({ name: 'team_id' })
  team: Team;

  @OneToOne(() => Person)
  @JoinColumn({ name: 'person_id' })
  person: Person;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { TeamUsers };
