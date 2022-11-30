import { EntityRepository, Repository } from 'typeorm';
import { TeamUsers } from '../models/TeamUsers';

@EntityRepository(TeamUsers)
class TeamUsersRepository extends Repository<TeamUsers> {}

export { TeamUsersRepository };
