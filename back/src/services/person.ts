import { getCustomRepository } from 'typeorm';
import { PersonRepository } from '../database/repositories/personRepository';
import Utils from '../utils/encript';
// import Utils from '../utils/encript';

class PersonService {
  showAll = async () => {
    const personRepository = getCustomRepository(PersonRepository);

    const personList = await personRepository.find({
      select: ['id', 'name', 'email', 'telefone', 'cargo'],
    });

    return personList;
  };

  store = async (name: string, email: string, telefone: string, cargo: string, password: string) => {
    const personRepository = getCustomRepository(PersonRepository);

    const existPerson = await personRepository.findOne({
      where: {
        email: email,
      },
    });

    let person;

    const encriptedPassword: string = await Utils.encriptPassword(password);

    if (!existPerson) {
      person = personRepository.create({
        name,
        email,
        telefone,
        cargo,
        password: encriptedPassword,
      });

      await personRepository.save(person);

      delete person['password'];
    } else {
      person = existPerson;
    }

    return person;
  };

  showPerson = async (id: string) => {
    const personRepository = getCustomRepository(PersonRepository);

    const person = await personRepository.findOne({
      where: {
        id,
      },
      select: ['id', 'name', 'email', 'telefone', 'cargo'],
    });

    return person;
  };

  findPersonByEmailOrUsername = async (email?: string) => {
    const personRepository = getCustomRepository(PersonRepository);

    const person = await personRepository.findOne({
      where: { email },
      select: ['id', 'name', 'email', 'telefone', 'cargo', 'password'],
    });

    return person;
  };

  update = async (id: string, name?: string, email?: string, telefone?: string, cargo?: string, password?: string) => {
    const person = await this.showPerson(id);

    if (!person) {
      return person;
    }

    if (name) {
      person.name = name;
    }

    if (email) {
      person.email = email;
    }

    if (telefone) {
      person.telefone = telefone;
    }

    if (cargo) {
      person.cargo = cargo;
    }

    if (password) {
      const encriptedPassword: string = await Utils.encriptPassword(password);
      person.password = encriptedPassword;
    }

    const personRepository = getCustomRepository(PersonRepository);
    await personRepository.save(person);

    delete person['password'];

    return person;
  };

  destroy = async (id: string) => {
    const personRepository = getCustomRepository(PersonRepository);

    await personRepository.delete({
      id,
    });
  };
}

export default PersonService;
