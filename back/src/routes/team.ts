import express from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import TeamController from '../controllers/teamController';

const router = express.Router();

const teamController = new TeamController();

router.get('/teams', teamController.index);

router.post(
  '/teams/store',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      team_name: Joi.string().required().min(3),
      sector: Joi.string().required().min(3),
    }),
  }),
  teamController.store,
);

router.get(
  '/teams/:id/show',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().required(),
    }),
  }),
  teamController.show,
);

router.put(
  '/teams/:id/update',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().required(),
    }),
  }),
  teamController.update,
);

router.delete(
  '/teams/:id/delete',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().required(),
    }),
  }),
  teamController.delete,
);

export { router as teamRouter };
