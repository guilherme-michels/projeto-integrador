import express from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ProjectController from '../controllers/projectController';

const router = express.Router();

const projectController = new ProjectController();

router.get('/projects', projectController.index);

router.post(
  '/projects/store',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required().min(3),
    }),
  }),
  projectController.store,
);

router.get(
  '/projects/:id/show',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().required(),
    }),
  }),
  projectController.show,
);

router.put(
  '/projects/:id/update',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().required(),
    }),
  }),
  projectController.update,
);

router.delete(
  '/projects/:id/delete',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().required(),
    }),
  }),
  projectController.delete,
);

export { router as projectRouter };
