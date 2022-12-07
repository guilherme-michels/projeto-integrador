import { getCustomRepository } from 'typeorm';
import { TaskRepository } from '../database/repositories/taskRepository';
import PersonService from './person';
import ProjectService from './project';

class TaskService {
  showAll = async (projectId: string) => {
    const taskRepository = getCustomRepository(TaskRepository);

    const taskList = await taskRepository.find({
      select: ['id', 'name', 'description', 'color', 'person', 'status', 'projectId'],
      where: {
        projectId,
      },
      loadEagerRelations: true,
      relations: ['person'],
    });

    return taskList;
  };

  store = async (
    name: string,
    description: string,
    color: string,
    person: {
      id: string;
      name: string;
    },
    status: string,
    projectId: string,
  ) => {
    const taskRepository = getCustomRepository(TaskRepository);

    const existTask = await taskRepository.findOne({
      where: {
        name: name,
      },
    });

    let task;

    if (!existTask) {
      task = taskRepository.create({
        name,
        description,
        color,
        person,
        status,
        projectId,
      });

      await taskRepository.save(task);
    } else {
      task = existTask;
    }

    return task;
  };

  showTask = async (id: string) => {
    const taskRepository = getCustomRepository(TaskRepository);

    const task = await taskRepository.findOne({
      where: {
        id,
      },
      select: ['id', 'name', 'description', 'color', 'person', 'status', 'projectId'],
      loadEagerRelations: true,
      relations: ['person'],
    });

    return task;
  };

  update = async (
    id: string,
    name: string,
    description: string,
    color: string,
    personId: string,
    status: string,
    projectId: string,
  ) => {
    const task = await this.showTask(id);

    if (!task) {
      return task;
    }

    if (name) {
      task.name = name;
    }

    if (description) {
      task.description = description;
    }

    if (color) {
      task.color = color;
    }

    const person = await new PersonService().showPerson(personId);
    if (person == null) {
      throw new Error(`Person with id ${personId} was not found`);
    }

    task.person = person;

    if (status) {
      task.status = status;
    }

    const project = await new ProjectService().showProject(projectId);
    if (project == null) {
      throw new Error(`Project with id ${projectId} was not found`);
    }

    task.projectId = project.id;

    const taskRepository = getCustomRepository(TaskRepository);
    await taskRepository.save(task);

    return task;
  };

  destroy = async (id: string) => {
    const taskRepository = getCustomRepository(TaskRepository);

    await taskRepository.delete({
      id,
    });
  };
}

export default TaskService;
