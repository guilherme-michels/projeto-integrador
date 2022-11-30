import { Request, Response } from 'express';
import TeamService from '../services/team';

class TeamController {
  index = async (request: Request, response: Response) => {
    try {
      const teamService = new TeamService();
      const teamList = await teamService.showAll();

      return response.status(200).json({
        message: 'Lista de times obtidas com sucesso.',
        teamList: teamList,
      });
    } catch (e) {
      return response.status(500).json({
        message: e.message,
      });
    }
  };

  store = async (request: Request, response: Response) => {
    try {
      const { team_name, sector } = request.body;

      const teamService = new TeamService();
      const team = await teamService.store(team_name, sector);

      return response.status(200).json({
        message: 'Time criado com sucesso.',
        team: team,
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

      const teamService = new TeamService();
      const team = await teamService.showTeam(id);

      if (!team) {
        return response.status(404).json({
          message: 'Time não encontrado.',
        });
      }

      return response.status(200).json({
        message: 'Time obtido com sucesso.',
        team: team,
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
      const { team_name, sector } = request.body;

      const teamService = new TeamService();

      const team = await teamService.update(id, team_name, sector);

      if (!team) {
        return response.status(404).json({
          message: 'Time não encontrado.',
        });
      }

      return response.status(200).json({
        message: 'Time atualizado com sucesso.',
        team: team,
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

      const teamService = new TeamService();
      await teamService.destroy(id);

      return response.status(200).json({
        message: 'Time removido com sucesso.',
      });
    } catch (e) {
      return response.status(500).json({
        message: e.message,
      });
    }
  };
}

export default TeamController;
