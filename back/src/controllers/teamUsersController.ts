import { Request, Response } from 'express';
import TeamUsersService from '../services/teamUsers';

class TeamUsersController {
  index = async (request: Request, response: Response) => {
    try {
      const teamUsersService = new TeamUsersService();
      const teamUsersList = await teamUsersService.showAll();

      return response.status(200).json({
        message: 'Lista de Times-usuários obtidos com sucesso.',
        teamUsersList: teamUsersList,
      });
    } catch (e) {
      return response.status(500).json({
        message: e.message,
      });
    }
  };

  store = async (request: Request, response: Response) => {
    try {
      const { team_id, person_id } = request.body;

      const teamUsersService = new TeamUsersService();
      const teamUsers = await teamUsersService.store(team_id, person_id);

      return response.status(200).json({
        message: 'Times-usuários criado com sucesso.',
        teamUsers: teamUsers,
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

      const teamUsersService = new TeamUsersService();
      const teamUsers = await teamUsersService.showTeamUsers(id);

      if (!teamUsers) {
        return response.status(404).json({
          message: 'Times-usuários não encontrado.',
        });
      }

      return response.status(200).json({
        message: 'Times-usuários obtida com sucesso.',
        teamUsers: teamUsers,
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
      const { person_id, team_id } = request.body;

      const teamUsersService = new TeamUsersService();

      const teamUsers = await teamUsersService.update(id, person_id, team_id);

      if (!teamUsers) {
        return response.status(404).json({
          message: 'Times-usuários não encontrado.',
        });
      }

      return response.status(200).json({
        message: 'Times-usuários atualizado com sucesso.',
        teamUsers: teamUsers,
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

      const teamUsersService = new TeamUsersService();
      await teamUsersService.destroy(id);

      return response.status(200).json({
        message: 'Times-usuários removido com sucesso.',
      });
    } catch (e) {
      return response.status(500).json({
        message: e.message,
      });
    }
  };
}

export default TeamUsersController;
