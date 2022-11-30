import { getCustomRepository } from 'typeorm';
import { ProjectUsersRepository } from '../database/repositories/projectUsersRepository';
import PersonService from './person';
import ProjectService from './project';

class ProjectUsersService {
  showAll = async () => {
    const projectUsersRepository = getCustomRepository(ProjectUsersRepository);

    const projectUsersList = await projectUsersRepository.find({
      select: ['id', 'person', 'project'],
      loadEagerRelations: true,
      relations: ['person', 'project'],
    });

    return projectUsersList;
  };

  store = async (
    person: {
      id: string;
      name: string;
    },
    project: {
      id: string;
      name: string;
    },
  ) => {
    const projectUsersRepository = getCustomRepository(ProjectUsersRepository);

    const existProjectUsers = await projectUsersRepository.findOne({
      where: {
        person: person,
        project: project,
      },
    });

    let projectUsers;

    if (!existProjectUsers) {
      projectUsers = projectUsersRepository.create({
        person,
        project,
      });

      await projectUsersRepository.save(projectUsers);
    } else {
      projectUsers = existProjectUsers;
    }

    return projectUsers;
  };

  showProjectUsers = async (id: string) => {
    const projectUsersRepository = getCustomRepository(ProjectUsersRepository);

    const projectUsers = await projectUsersRepository.findOne({
      where: {
        id,
      },
      select: ['id', 'project', 'person'],
      loadEagerRelations: true,
      relations: ['project', 'person'],
    });

    return projectUsers;
  };

  update = async (
    id: string,
    person?: {
      id: string;
      name: string;
    },
    project?: {
      id: string;
      name: string;
    },
  ) => {
    const projectUsers = await this.showProjectUsers(id);

    if (!projectUsers) {
      return projectUsers;
    }

    const projectId = project.id;

    if (projectId) {
      const project = await new ProjectService().showProject(projectId);
      projectUsers.project = project;
    }

    const personId = person.id;

    if (personId) {
      const person = await new PersonService().showPerson(personId);
      projectUsers.person = person;
    }

    const projectUsersRepository = getCustomRepository(ProjectUsersRepository);
    await projectUsersRepository.save(projectUsers);

    return projectUsers;
  };

  destroy = async (id: string) => {
    const projectUsersRepository = getCustomRepository(ProjectUsersRepository);

    await projectUsersRepository.delete({
      id,
    });
  };
}

export default ProjectUsersService;
