import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import PersonService from '../services/person';
import Utils from '../utils/encript';

class AuthController {
  store = async (request: Request, response: Response) => {
    const { email, password } = request.body;

    const personService = new PersonService();
    const user = await personService.findPersonByEmailOrUsername(email);

    if (user) {
      Utils.comparePassword(password, user.password, (error: Error, isMatch: boolean) => {
        if (error || !isMatch) {
          return response.status(401).json({
            auth: false,
            message: 'Autenticação inválida!',
          });
        }

        const id = user.id;
        const secret = process.env.JWT_SECRET ?? '';
        const token = jwt.sign({ id }, secret);

        return response.status(200).json({
          auth: true,
          token,
          person: user,
        });
      });
    } else {
      return response.status(401).json({
        auth: false,
        message: 'Autenticação inválida!',
      });
    }
  };

  show = async (request: Request, response: Response) => {
    try {
      const id = response.locals.jwtPayload.id;

      const personService = new PersonService();
      const person = await personService.showPerson(id);

      if (!person) {
        return response.status(401).json({
          message: 'Falha ao validar token.',
        });
      }

      return response.status(200).json({
        message: 'Dados do usuário autenticado obtidos com sucesso.',
        person: person,
      });
    } catch (e) {
      return response.status(500).json({
        message: e.message,
      });
    }
  };
}

export default AuthController;
