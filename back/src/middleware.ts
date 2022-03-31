import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import PersonService from './services/person';

class Middleware {
  static validateToken = (request: Request, response: Response, next: NextFunction) => {
    let { authorization } = request.headers;

    if (authorization) {
      if (authorization.startsWith('Bearer ')) {
        authorization = authorization.slice(7, authorization.length);
      }

      const secret = process.env.JWT_SECRET ?? '';

      jwt.verify(authorization, secret, async (error, user: any) => {
        if (error) {
          return response.status(401).json({
            success: false,
            message: 'Autenticação inválida!'
          });
        } else {
          if (user) {
            const personService = new PersonService();
            const person = personService.showPerson(user.id);
            if (person == null) {
              return response.status(401).json({
                success: false,
                message: 'Usuário inativo!'
              });
            }
          }

          response.locals.jwtPayload = user;
          next();
        }
      });
    } else {
      return response.status(401).json({
        success: false,
        message: 'Autenticação não realizada!'
      });
    }
  }
}

export default Middleware;
