import express from 'express';

import { personRouter } from './person';
// import { authRouter } from './auth';

const routes = express.Router();
routes.use(personRouter);
// routes.use(authRouter);

export default routes;
