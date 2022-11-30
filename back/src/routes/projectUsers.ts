import express from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ProjectUsersController from '../controllers/projectUsersController';

const router = express.Router();

const projectUsersController = new ProjectUsersController();

router.get('/projects-users', projectUsersController.index);

router.post(
  '/projects-users/store',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      project_id: Joi.string().required(),
      person_id: Joi.string().required(),
    }),
  }),
  projectUsersController.store,
);

router.get(
  '/projects-users/:id/show',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().required(),
    }),
  }),
  projectUsersController.show,
);

router.put(
  '/projects-users/:id/update',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().required(),
    }),
  }),
  projectUsersController.update,
);

router.delete(
  '/projects-users/:id/delete',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().required(),
    }),
  }),
  projectUsersController.delete,
);

export { router as projectUsersRouter };
