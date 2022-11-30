import { EntityRepository, Repository } from 'typeorm';
import { ProjectTasks } from '../models/ProjectTasks';

@EntityRepository(ProjectTasks)
class ProjectTasksRepository extends Repository<ProjectTasks> {}

export { ProjectTasksRepository };
