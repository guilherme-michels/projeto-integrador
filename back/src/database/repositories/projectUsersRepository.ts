import { EntityRepository, Repository } from 'typeorm';
import { ProjectUsers } from '../models/ProjectUsers';

@EntityRepository(ProjectUsers)
class ProjectUsersRepository extends Repository<ProjectUsers> {}

export { ProjectUsersRepository };
