import { Request, Response } from 'express';
import ProjectTasksService from '../services/projectTasks';

class ProjectTasksController {
  index = async (request: Request, response: Response) => {
    try {
      const projectTasksService = new ProjectTasksService();
      const projectTasksList = await projectTasksService.showAll();

      return response.status(200).json({
        message: 'Lista de projetos-tarefas obtidas com sucesso.',
        projectTasksList: projectTasksList,
      });
    } catch (e) {
      return response.status(500).json({
        message: e.message,
      });
    }
  };

  store = async (request: Request, response: Response) => {
    try {
      const { project_id, task_id } = request.body;

      const projectTasksService = new ProjectTasksService();
      const projectTasks = await projectTasksService.store(project_id, task_id);

      return response.status(200).json({
        message: 'Projetos-tarefas criada com sucesso.',
        projectTasks: projectTasks,
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

      const projectTasksService = new ProjectTasksService();
      const projectTasks = await projectTasksService.showProjectTasks(id);

      if (!projectTasks) {
        return response.status(404).json({
          message: 'Projetos-tarefas não encontrada.',
        });
      }

      return response.status(200).json({
        message: 'Projetos-tarefas obtida com sucesso.',
        projectTasks: projectTasks,
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
      const { project_id, task_id } = request.body;

      const projectTasksService = new ProjectTasksService();

      const projectTasks = await projectTasksService.update(id, project_id, task_id);

      if (!projectTasks) {
        return response.status(404).json({
          message: 'Projetos-tarefas não encontrada.',
        });
      }

      return response.status(200).json({
        message: 'Projetos-tarefas atualizada com sucesso.',
        projectTasks: projectTasks,
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

      const projectTasksService = new ProjectTasksService();
      await projectTasksService.destroy(id);

      return response.status(200).json({
        message: 'Projetos-tarefas removida com sucesso.',
      });
    } catch (e) {
      return response.status(500).json({
        message: e.message,
      });
    }
  };
}

export default ProjectTasksController;
