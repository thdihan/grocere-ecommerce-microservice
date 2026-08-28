/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
// import * as path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { globalErrorHandler } from '@grocer-e/global-error-handler';
import router from './route';

const app = express();

app.use(
  cors({
    origin: ['http://localhost:3000'],
    allowedHeaders: ['Authorization', 'Content-Type'],
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.get('/welcome', (req, res) => {
  res.send({ message: 'Welcome to auth-service!' });
});

app.use('/', router);

app.use(globalErrorHandler);
const port = process.env.AUTH_SERVICE_PORT || 6001;

const server = app.listen(port, () => {
  console.log(`[ AUTH SERVICE ] Listening at http://localhost:${port}`);
});
server.on('error', console.error);
