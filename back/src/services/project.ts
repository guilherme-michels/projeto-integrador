import { getCustomRepository } from 'typeorm';
import { ProjectRepository } from '../database/repositories/projectRepository';

class ProjectService {
  showAll = async () => {
    const projectRepository = getCustomRepository(ProjectRepository);

    const projectList = await projectRepository.find({
      select: ['id', 'name'],
    });

    return projectList;
  };

  store = async (name: string) => {
    const projectRepository = getCustomRepository(ProjectRepository);

    const existProject = await projectRepository.findOne({
      where: {
        name: name,
      },
    });

    let project;

    if (!existProject) {
      project = projectRepository.create({
        name,
      });

      await projectRepository.save(project);
    } else {
      project = existProject;
    }

    return project;
  };

  showProject = async (id: string) => {
    const projectRepository = getCustomRepository(ProjectRepository);

    const project = await projectRepository.findOne({
      where: {
        id,
      },
      select: ['id', 'name'],
    });

    return project;
  };

  findProjectByName = async (name?: string) => {
    const projectRepository = getCustomRepository(ProjectRepository);

    const project = await projectRepository.findOne({
      where: { name },
      select: ['id', 'name'],
    });

    return project;
  };

  update = async (id: string, name?: string) => {
    const project = await this.showProject(id);

    if (!project) {
      return project;
    }

    if (name) {
      project.name = name;
    }

    const projectRepository = getCustomRepository(ProjectRepository);
    await projectRepository.save(project);

    return project;
  };

  destroy = async (id: string) => {
    const projectRepository = getCustomRepository(ProjectRepository);

    await projectRepository.delete({
      id,
    });
  };
}

export default ProjectService;
