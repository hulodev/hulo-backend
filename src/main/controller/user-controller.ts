import { RegisterUserRequest, RegisterUserResponse } from '../model/dto/user/register-user-dto';
import { toRegisterUserResponse } from '../util/user/mapper';
import executeRegisterUser from '../service/user/register-user';
import logger from '../util/app/logger';

/**
 * Method to create a Hulo User.
 */
const registerUser = async (req: RegisterUserRequest): Promise<RegisterUserResponse> => {
  logger.info(`Begin registration of user: ${req.userId}`);
  const user = await executeRegisterUser(req);
  return toRegisterUserResponse(user);
};

export { registerUser };
