// import { Request, Response } from 'express';
// import jwt from 'jsonwebtoken';

// import PersonService from '../services/person';
// import Utils from '../utils/encript';

// class AuthController {
//   store = async (request: Request, response: Response) => {
//     const { email, username, password } = request.body;

//     const personService = new PersonService();
//     const user = await personService.findPersonByEmailOrUsername(email, username);

//     if (user) {
//       Utils.comparePassword(password, user.password, (error: Error, isMatch: boolean) => {
//         if (error || !isMatch) {
//           return response.status(401).json({
//             auth: false,
//             message: 'Autenticação inválida!',
//           });
//         }

//         const id = user.id;
//         const name = user.name;
//         const secret = process.env.JWT_SECRET ?? '';
//         const token = jwt.sign({ id }, secret);

//         return response.status(200).json({
//           auth: true,
//           token,
//           name,
//         });
//       });
//     } else {
//       return response.status(401).json({
//         auth: false,
//         message: 'Autenticação inválida!',
//       });
//     }
//   };
// }

// export default AuthController;
