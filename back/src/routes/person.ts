import express from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import PersonController from '../controllers/personController';

const router = express.Router();

const personController = new PersonController();

router.get('/persons', personController.index);

router.post(
  '/persons/store',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required().min(3),
      email: Joi.string().required().email(),
      telefone: Joi.string().required().min(3),
      cargo: Joi.string().required().min(5),
      password: Joi.string().required().min(5),
    }),
  }),
  personController.store,
);

router.get(
  '/persons/:id/show',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().required(),
    }),
  }),
  personController.show,
);

router.put(
  '/persons/:id/update',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().required(),
    }),
  }),
  personController.update,
);

router.delete(
  '/persons/:id/delete',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().required(),
    }),
  }),
  personController.delete,
);

export { router as personRouter };
