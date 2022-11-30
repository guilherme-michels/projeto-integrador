import { Request, Response } from 'express';
import ProjectService from '../services/project';

class ProjectController {
  index = async (request: Request, response: Response) => {
    try {
      const projectService = new ProjectService();
      const projectList = await projectService.showAll();

      return response.status(200).json({
        message: 'Lista de projetos obtidas com sucesso.',
        projectList: projectList,
      });
    } catch (e) {
      return response.status(500).json({
        message: e.message,
      });
    }
  };

  store = async (request: Request, response: Response) => {
    try {
      const { name } = request.body;

      const projectService = new ProjectService();
      const project = await projectService.store(name);

      return response.status(200).json({
        message: 'Projeto criado com sucesso.',
        project: project,
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

      const projectService = new ProjectService();
      const project = await projectService.showProject(id);

      if (!project) {
        return response.status(404).json({
          message: 'Projeto não encontrado.',
        });
      }

      return response.status(200).json({
        message: 'Projeto obtido com sucesso.',
        project: project,
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
      const { name } = request.body;

      const projectService = new ProjectService();

      const project = await projectService.update(id, name);

      if (!project) {
        return response.status(404).json({
          message: 'Projeto não encontrado.',
        });
      }

      return response.status(200).json({
        message: 'Projeto atualizado com sucesso.',
        project: project,
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

      const projectService = new ProjectService();
      await projectService.destroy(id);

      return response.status(200).json({
        message: 'Projeto removido com sucesso.',
      });
    } catch (e) {
      return response.status(500).json({
        message: e.message,
      });
    }
  };
}

export default ProjectController;
