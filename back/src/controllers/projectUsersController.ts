import { Request, Response } from 'express';
import ProjectUsersService from '../services/projectUsers';

class ProjectUsersController {
  index = async (request: Request, response: Response) => {
    try {
      const projectUsersService = new ProjectUsersService();
      const projectUsersList = await projectUsersService.showAll();

      return response.status(200).json({
        message: 'Lista de projetos-usuários obtidos com sucesso.',
        projectUsersList: projectUsersList,
      });
    } catch (e) {
      return response.status(500).json({
        message: e.message,
      });
    }
  };

  store = async (request: Request, response: Response) => {
    try {
      const { project_id, person_id } = request.body;

      const projectUsersService = new ProjectUsersService();
      const projectUsers = await projectUsersService.store(project_id, person_id);

      return response.status(200).json({
        message: 'Projetos-usuários criado com sucesso.',
        projectUsers: projectUsers,
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

      const projectUsersService = new ProjectUsersService();
      const projectUsers = await projectUsersService.showProjectUsers(id);

      if (!projectUsers) {
        return response.status(404).json({
          message: 'Projetos-usuários não encontrado.',
        });
      }

      return response.status(200).json({
        message: 'Projetos-usuários obtida com sucesso.',
        projectUsers: projectUsers,
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
      const { project_id, person_id } = request.body;

      const projectUsersService = new ProjectUsersService();

      const projectUsers = await projectUsersService.update(id, project_id, person_id);

      if (!projectUsers) {
        return response.status(404).json({
          message: 'Projetos-usuários não encontrado.',
        });
      }

      return response.status(200).json({
        message: 'Projetos-usuários atualizado com sucesso.',
        projectUsers: projectUsers,
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

      const projectUsersService = new ProjectUsersService();
      await projectUsersService.destroy(id);

      return response.status(200).json({
        message: 'Projetos-usuários removido com sucesso.',
      });
    } catch (e) {
      return response.status(500).json({
        message: e.message,
      });
    }
  };
}

export default ProjectUsersController;
