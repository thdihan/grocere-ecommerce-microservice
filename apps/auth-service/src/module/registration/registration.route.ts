import { Router } from 'express';
import { RegistrationController } from './registration.controller';

const router: Router = Router();

router.post('/user-register', RegistrationController.customerRegistration);

export const RegistrationRoutes = router;
