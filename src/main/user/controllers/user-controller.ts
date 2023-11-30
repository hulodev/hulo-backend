import { RegisterUserRequest, RegisterUserResponse } from '../models/dto';
import { toRegisterUserResponse } from '../util/mapper';
import executeRegisterUser from '../services/register-user';
import logger from '../../utils/logger';

/* method to create a hulo user */
const registerUser = async (req: RegisterUserRequest): Promise<RegisterUserResponse> => {
  logger.info(`Begin registration of user: ${req.userId}`);
  const user = await executeRegisterUser(req);
  return toRegisterUserResponse(user);
};

export { registerUser };
