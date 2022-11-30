import express from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import TeamUsersController from '../controllers/teamUsersController';

const router = express.Router();

const teamUsersController = new TeamUsersController();

router.get('/team-users', teamUsersController.index);

router.post(
  '/team-users/store',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required().min(3),
      team_id: Joi.string().required(),
      person_id: Joi.string().required(),
    }),
  }),
  teamUsersController.store,
);

router.get(
  '/team-users/:id/show',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().required(),
    }),
  }),
  teamUsersController.show,
);

router.put(
  '/team-users/:id/update',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().required(),
    }),
  }),
  teamUsersController.update,
);

router.delete(
  '/team-users/:id/delete',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().required(),
    }),
  }),
  teamUsersController.delete,
);

export { router as teamUsersRouter };
