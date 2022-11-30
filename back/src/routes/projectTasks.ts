import express from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ProjectTasksController from '../controllers/projectTasksController';

const router = express.Router();

const projectTasksController = new ProjectTasksController();

router.get('/projects-tasks', projectTasksController.index);

router.post(
  '/projects-tasks/store',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      project_id: Joi.string().required(),
      task_id: Joi.string().required(),
    }),
  }),
  projectTasksController.store,
);

router.get(
  '/projects-tasks/:id/show',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().required(),
    }),
  }),
  projectTasksController.show,
);

router.put(
  '/projects-tasks/:id/update',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().required(),
    }),
  }),
  projectTasksController.update,
);

router.delete(
  '/projects-tasks/:id/delete',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().required(),
    }),
  }),
  projectTasksController.delete,
);

export { router as projectTasksRouter };
