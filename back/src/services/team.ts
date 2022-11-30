import { getCustomRepository } from 'typeorm';
import { TeamRepository } from '../database/repositories/teamRepository';

class TeamService {
  showAll = async () => {
    const teamRepository = getCustomRepository(TeamRepository);

    const teamList = await teamRepository.find({
      select: ['id', 'team_name', 'sector'],
    });

    return teamList;
  };

  store = async (team_name: string, sector: string) => {
    const teamRepository = getCustomRepository(TeamRepository);

    const existTeam = await teamRepository.findOne({
      where: {
        team_name: team_name,
      },
    });

    let team;

    if (!existTeam) {
      team = teamRepository.create({
        team_name,
        sector,
      });

      await teamRepository.save(team);
    } else {
      team = existTeam;
    }

    return team;
  };

  showTeam = async (id: string) => {
    const teamRepository = getCustomRepository(TeamRepository);

    const team = await teamRepository.findOne({
      where: {
        id,
      },
      select: ['id', 'team_name', 'sector'],
    });

    return team;
  };

  findTeamByName = async (team_name?: string) => {
    const teamRepository = getCustomRepository(TeamRepository);

    const team = await teamRepository.findOne({
      where: { team_name },
      select: ['id', 'team_name', 'sector'],
    });

    return team;
  };

  update = async (id: string, team_name?: string, sector?: string) => {
    const team = await this.showTeam(id);

    if (!team) {
      return team;
    }

    if (team_name) {
      team.team_name = team_name;
    }

    if (sector) {
      team.sector = sector;
    }

    const teamRepository = getCustomRepository(TeamRepository);
    await teamRepository.save(team);

    return team;
  };

  destroy = async (id: string) => {
    const teamRepository = getCustomRepository(TeamRepository);

    await teamRepository.delete({
      id,
    });
  };
}

export default TeamService;
