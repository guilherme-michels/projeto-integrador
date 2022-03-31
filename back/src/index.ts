import 'reflect-metadata';

import Log from '@wa/log';
import LogConfig from './log';

import express from 'express';
import { json } from 'body-parser';
import { errors } from 'celebrate';
import cors from 'cors';

import routes from './routes/routes';

import createConnection from './database';

// Logs configuration
new LogConfig();

const app = express();
app.use(json());
app.use(cors());

createConnection();

app.use('/api', routes);

const uri = process.env.APPLICATION_URI;
const port = process.env.APPLICATION_PORT;

app.use(errors());

app.listen(port, () => {
  Log.info(
    'MES3 API',
    `Server is listening on port ${process.env.APPLICATION_PORT} on mode ${process.env.NODE_ENV}.
    Check ${uri}:${port}/api`
  );
});
