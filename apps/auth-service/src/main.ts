/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { globalErrorHandler } from '@grocer-e/global-error-handler';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
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

// Load Auto-generated Swagger Spec
const swaggerOutputPath = path.join(__dirname, '../swagger-output.json');
if (fs.existsSync(swaggerOutputPath)) {
  const swaggerDocument = JSON.parse(
    fs.readFileSync(swaggerOutputPath, 'utf-8'),
  );

  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

app.use('/', router);

app.use(globalErrorHandler);
const port = process.env.AUTH_SERVICE_PORT || 6001;

const server = app.listen(port, () => {
  console.log(`[ AUTH SERVICE ] Listening at http://localhost:${port}`);
});
server.on('error', console.error);
