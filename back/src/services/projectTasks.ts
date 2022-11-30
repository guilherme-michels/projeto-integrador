import { getCustomRepository } from 'typeorm';
import { ProjectTasksRepository } from '../database/repositories/projectTasksRepository';
import TaskService from './task';
import ProjectService from './project';

class ProjectTasksService {
  showAll = async () => {
    const projectTasksRepository = getCustomRepository(ProjectTasksRepository);

    const projectTasksList = await projectTasksRepository.find({
      select: ['id', 'task', 'project'],
      loadEagerRelations: true,
      relations: ['task', 'project'],
    });

    return projectTasksList;
  };

  store = async (
    task: {
      id: string;
      name: string;
    },
    project: {
      id: string;
      name: string;
    },
  ) => {
    const projectTasksRepository = getCustomRepository(ProjectTasksRepository);

    const existProjectTasks = await projectTasksRepository.findOne({
      where: {
        task: task,
        project: project,
      },
    });

    let projectTasks;

    if (!existProjectTasks) {
      projectTasks = projectTasksRepository.create({
        task,
        project,
      });

      await projectTasksRepository.save(projectTasks);
    } else {
      projectTasks = existProjectTasks;
    }

    return task;
  };

  showProjectTasks = async (id: string) => {
    const projectTasksRepository = getCustomRepository(ProjectTasksRepository);

    const projectTasks = await projectTasksRepository.findOne({
      where: {
        id,
      },
      select: ['id', 'project', 'task'],
      loadEagerRelations: true,
      relations: ['project', 'task'],
    });

    return projectTasks;
  };

  update = async (
    id: string,
    task?: {
      id: string;
      name: string;
    },
    project?: {
      id: string;
      name: string;
    },
  ) => {
    const projectTasks = await this.showProjectTasks(id);

    if (!projectTasks) {
      return projectTasks;
    }

    const projectId = project.id;

    if (projectId) {
      const project = await new ProjectService().showProject(projectId);
      projectTasks.project = project;
    }

    const taskId = task.id;

    if (taskId) {
      const task = await new TaskService().showTask(taskId);
      projectTasks.task = task;
    }

    const projectTasksRepository = getCustomRepository(ProjectTasksRepository);
    await projectTasksRepository.save(projectTasks);

    return projectTasks;
  };

  destroy = async (id: string) => {
    const projectTasksRepository = getCustomRepository(ProjectTasksRepository);

    await projectTasksRepository.delete({
      id,
    });
  };
}

export default ProjectTasksService;
