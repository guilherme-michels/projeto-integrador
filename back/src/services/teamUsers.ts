import { getCustomRepository } from 'typeorm';
import { TeamUsersRepository } from '../database/repositories/teamUsersRepository';
import PersonService from './person';
import TeamService from './team';

class TeamUsersService {
  showAll = async () => {
    const teamUsersRepository = getCustomRepository(TeamUsersRepository);

    const teamUsersList = await teamUsersRepository.find({
      select: ['id', 'person', 'team'],
      loadEagerRelations: true,
      relations: ['person', 'team'],
    });

    return teamUsersList;
  };

  store = async (
    person: {
      id: string;
      name: string;
    },
    team: {
      id: string;
      name: string;
    },
  ) => {
    const teamUsersRepository = getCustomRepository(TeamUsersRepository);

    const existTeamUsers = await teamUsersRepository.findOne({
      where: {
        person: person,
        team: team,
      },
    });

    let teamUsers;

    if (!existTeamUsers) {
      teamUsers = teamUsersRepository.create({
        person,
        team,
      });

      await teamUsersRepository.save(teamUsers);
    } else {
      teamUsers = existTeamUsers;
    }

    return teamUsers;
  };

  showTeamUsers = async (id: string) => {
    const teamUsersRepository = getCustomRepository(TeamUsersRepository);

    const teamUsers = await teamUsersRepository.findOne({
      where: {
        id,
      },
      select: ['id', 'team', 'person'],
      loadEagerRelations: true,
      relations: ['team', 'person'],
    });

    return teamUsers;
  };

  update = async (
    id: string,
    person?: {
      id: string;
      name: string;
    },
    team?: {
      id: string;
      name: string;
    },
  ) => {
    const teamUsers = await this.showTeamUsers(id);

    if (!teamUsers) {
      return teamUsers;
    }

    const teamId = team.id;

    if (teamId) {
      const team = await new TeamService().showTeam(teamId);
      teamUsers.team = team;
    }

    const personId = person.id;

    if (personId) {
      const person = await new PersonService().showPerson(personId);
      teamUsers.person = person;
    }

    const teamUsersRepository = getCustomRepository(TeamUsersRepository);
    await teamUsersRepository.save(teamUsers);

    return teamUsers;
  };

  destroy = async (id: string) => {
    const teamUsersRepository = getCustomRepository(TeamUsersRepository);

    await teamUsersRepository.delete({
      id,
    });
  };
}

export default TeamUsersService;
