import { getCustomRepository } from 'typeorm';
import { PersonRepository } from '../database/repositories/personRepository';

class PersonService {
  showAll = async () => {
    const personRepository = getCustomRepository(PersonRepository);

    const personList = await personRepository.find({
      select: ['id', 'name', 'email', 'telefone', 'cargo'],
    });

    return personList;
  };

  store = async (name: string, email: string, telefone: string, cargo: string) => {
    const personRepository = getCustomRepository(PersonRepository);

    const existPerson = await personRepository.findOne({
      where: {
        email: email,
      },
    });

    let person;

    // const encriptedPassword: string = await Utils.encriptPassword(password);

    if (!existPerson) {
      person = personRepository.create({
        cargo,
        email,
        name,
        telefone,
      });

      await personRepository.save(person);

      // delete person['password'];
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
      select: ['id', 'name', 'telefone', 'email', 'cargo'],
    });

    return person;
  };

  findPersonByEmailOrUsername = async (email?: string) => {
    const personRepository = getCustomRepository(PersonRepository);

    const person = await personRepository.findOne({
      where: { email },
      select: ['id', 'name', 'telefone', 'email', 'cargo'],
    });

    return person;
  };

  update = async (id: string, name?: string, email?: string, telefone?: string, cargo?: string) => {
    const person = await this.showPerson(id);

    if (!person) {
      return person;
    }

    if (name) {
      person.name = name;
    }

    if (telefone) {
      person.telefone = telefone;
    }

    if (cargo) {
      person.cargo = cargo;
    }

    if (email) {
      person.email = email;
    }

    // if (password) {
    //   const encriptedPassword: string = await Utils.encriptPassword(password);
    //   person.password = encriptedPassword;
    // }

    const personRepository = getCustomRepository(PersonRepository);
    await personRepository.save(person);

    // delete person['password'];

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
