import swaggerAutogen from 'swagger-autogen';
import path from 'path';

const doc = {
  info: {
    title: 'Auth Service API',
    description: 'Auto-generated API documentation for Auth Service.',
    version: '1.0.0',
  },
  host: 'localhost:8080/api/v1/auth',
  schemes: ['http'],
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
      description: 'Enter JWT token with Bearer prefix: Bearer <token>',
    },
  },
};

const outputFile = path.join(__dirname, '../swagger-output.json');
const routesFiles = [
  path.join(__dirname, './main.ts'), // Points to your entry point or router mounts
  path.join(__dirname, './module/registration/registration.route.ts'),
];

swaggerAutogen({ openapi: '3.0.0' })(outputFile, routesFiles, doc);
