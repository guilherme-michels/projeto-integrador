import { getCustomRepository } from 'typeorm';
import { TaskRepository } from '../database/repositories/taskRepository';

class TaskService {
  showAll = async () => {
    const taskRepository = getCustomRepository(TaskRepository);

    const taskList = await taskRepository.find({
      select: ['id', 'name', 'description', 'responsible', 'color'],
    });

    return taskList;
  };

  store = async (name: string, description: string, responsible: string, color: string) => {
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
        responsible,
        color,
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
      select: ['id', 'name', 'description', 'responsible', 'color'],
    });

    return task;
  };

  update = async (id: string, name?: string, description?: string, responsible?: string, color?: string) => {
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

    if (responsible) {
      task.responsible = responsible;
    }

    if (color) {
      task.color = color;
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
