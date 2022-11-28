import { Request, Response } from 'express';
import TaskService from '../services/task';

class TaskController {
  index = async (request: Request, response: Response) => {
    try {
      const taskService = new TaskService();
      const taskList = await taskService.showAll();

      return response.status(200).json({
        message: 'Lista de tarefas obtidas com sucesso.',
        taskList: taskList,
      });
    } catch (e) {
      return response.status(500).json({
        message: e.message,
      });
    }
  };

  store = async (request: Request, response: Response) => {
    try {
      const { name, description, color, person_id, status } = request.body;

      const taskService = new TaskService();
      const task = await taskService.store(name, description, color, person_id, status);

      return response.status(200).json({
        message: 'Tarefa criada com sucesso.',
        task: task,
      });
    } catch (e) {
      return response.status(500).json({
        message: e.message,
      });
    }
  };

  show = async (request: Request, response: Response) => {
    try {
      const { id } = request.params;

      const taskService = new TaskService();
      const task = await taskService.showTask(id);

      if (!task) {
        return response.status(404).json({
          message: 'Tarefa não encontrada.',
        });
      }

      return response.status(200).json({
        message: 'Tarefa obtida com sucesso.',
        task: task,
      });
    } catch (e) {
      return response.status(500).json({
        message: e.message,
      });
    }
  };

  update = async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      const { name, description, color, person_id, status } = request.body;

      const taskService = new TaskService();

      const task = await taskService.update(id, name, description, color, person_id, status);

      if (!task) {
        return response.status(404).json({
          message: 'Tarefa não encontrada.',
        });
      }

      return response.status(200).json({
        message: 'Tarefa atualizada com sucesso.',
        task: task,
      });
    } catch (e) {
      return response.status(500).json({
        message: e.message,
      });
    }
  };

  delete = async (request: Request, response: Response) => {
    try {
      const { id } = request.params;

      const taskService = new TaskService();
      await taskService.destroy(id);

      return response.status(200).json({
        message: 'Tarefa removida com sucesso.',
      });
    } catch (e) {
      return response.status(500).json({
        message: e.message,
      });
    }
  };
}

export default TaskController;
