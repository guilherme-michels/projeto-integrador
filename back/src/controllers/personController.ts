import { Request, Response } from 'express';
import PersonService from '../services/person';

class PersonController {
  index = async (request: Request, response: Response) => {
    try {
      const personService = new PersonService();
      const personList = await personService.showAll();

      return response.status(200).json({
        message: 'Lista de pessoas obtidas com sucesso.',
        personList: personList,
      });
    } catch (e) {
      return response.status(500).json({
        message: e.message,
      });
    }
  };

  store = async (request: Request, response: Response) => {
    try {
      const { name, telefone, email, cargo } = request.body;

      const personService = new PersonService();
      const person = await personService.store(name, email, telefone, cargo);

      return response.status(200).json({
        message: 'Pessoa criada com sucesso.',
        person: person,
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

      const personService = new PersonService();
      const person = await personService.showPerson(id);

      if (!person) {
        return response.status(404).json({
          message: 'Pessoa não encontrada.',
        });
      }

      return response.status(200).json({
        message: 'Pessoa obtida com sucesso.',
        person: person,
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
      const { name, email, telefone, cargo } = request.body;

      const personService = new PersonService();

      const person = await personService.update(id, name, email, cargo, telefone);

      if (!person) {
        return response.status(404).json({
          message: 'Pessoa não encontrada.',
        });
      }

      return response.status(200).json({
        message: 'Pessoa atualizada com sucesso.',
        person: person,
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

      const personService = new PersonService();
      await personService.destroy(id);

      return response.status(200).json({
        message: 'Pessoa removida com sucesso.',
      });
    } catch (e) {
      return response.status(500).json({
        message: e.message,
      });
    }
  };
}

export default PersonController;
