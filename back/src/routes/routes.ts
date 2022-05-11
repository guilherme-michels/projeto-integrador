import express from 'express';

import { personRouter } from './person';
import { taskRouter } from './task';
import { authRouter } from './auth';

const routes = express.Router();
routes.use(personRouter);
routes.use(taskRouter);
routes.use(authRouter);

export default routes;
