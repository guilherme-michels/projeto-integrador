import { getCustomRepository } from 'typeorm';
import { TaskRepository } from '../database/repositories/taskRepository';
import PersonService from './person';

class TaskService {
  showAll = async () => {
    const taskRepository = getCustomRepository(TaskRepository);

    const taskList = await taskRepository.find({
      select: ['id', 'name', 'description', 'color', 'person', 'status'],
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
      select: ['id', 'name', 'description', 'color', 'person', 'status'],
      loadEagerRelations: true,
      relations: ['person'],
    });

    return task;
  };

  update = async (
    id: string,
    name?: string,
    description?: string,
    color?: string,
    person?: {
      id: string;
      name: string;
    },
    status?: string,
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

    const personId = person.id;

    if (personId) {
      const person = await new PersonService().showPerson(personId);
      task.person = person;
    }

    if (status) {
      task.status = status;
    }

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
