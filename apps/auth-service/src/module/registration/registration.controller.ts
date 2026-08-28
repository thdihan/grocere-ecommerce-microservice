import { catchAsync, ControllerMap } from '@grocer-e/shared-utils';
import { RegistrationService } from './registration.service';

const customerRegistration = catchAsync(async (req, res) => {
  const result = RegistrationService.customerRegistration();
  console.log('[CUSTOMER REGISTRATION CONTROLLER]');

  res.status(200).json({
    message: 'USER REGISTRATION CONTROLLER',
  });
});

export const RegistrationController: ControllerMap = {
  customerRegistration,
};
