import { Router } from 'express';
import { RegistrationRoutes } from '../module/registration/registration.route';

const router: Router = Router();

const moduleRouter = [
  {
    path: '/registration',
    module: RegistrationRoutes,
  },
];

moduleRouter.forEach((route) => router.use(route.path, route.module));

export default router;
