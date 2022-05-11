import express from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import TaskController from '../controllers/taskController';

const router = express.Router();

const taskController = new TaskController();

router.get('/tasks', taskController.index);

router.post(
  '/tasks/store',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      description: Joi.string(),
      responsible: Joi.string().required(),
      color: Joi.string().required(),
    }),
  }),
  taskController.store,
);

router.get(
  '/tasks/:id/show',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().required(),
    }),
  }),
  taskController.show,
);

router.put(
  '/tasks/:id/update',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().required(),
    }),
  }),
  taskController.update,
);

router.delete(
  '/tasks/:id/delete',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().required(),
    }),
  }),
  taskController.delete,
);

export { router as taskRouter };
