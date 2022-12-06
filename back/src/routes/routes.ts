import express from 'express';

import { personRouter } from './person';
import { taskRouter } from './task';
import { authRouter } from './auth';
import { projectRouter } from './project';

const routes = express.Router();
routes.use(personRouter);
routes.use(taskRouter);
routes.use(authRouter);
routes.use(projectRouter);

export default routes;
