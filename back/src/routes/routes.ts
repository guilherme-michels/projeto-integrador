import express from 'express';

import { personRouter } from './person';
import { taskRouter } from './task';
import { authRouter } from './auth';
import { projectRouter } from './project';
import { projectTasksRouter } from './projectTasks';
import { projectUsersRouter } from './projectUsers';
import { teamRouter } from './team';
import { teamUsersRouter } from './teamUsers';

const routes = express.Router();
routes.use(personRouter);
routes.use(taskRouter);
routes.use(authRouter);
routes.use(projectRouter);
routes.use(projectTasksRouter);
routes.use(teamRouter);
routes.use(projectUsersRouter);
routes.use(teamUsersRouter);

export default routes;
