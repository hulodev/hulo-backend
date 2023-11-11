import { RegisterUserRequest, RegisterUserResponse } from '../models/dto';
import { toRegisterUserResponse } from '../util/util';
import executeRegisterUser from '../services/register-user';

const registerUser = async (req: RegisterUserRequest): Promise<RegisterUserResponse> => {
  const userData = req.body;

  const userInfo = {
    userId: req.userId,
    firstName: userData.firstName,
    lastName: userData.lastName,
    emailAddress: userData.emailAddress,
    username: userData.username,
    isEckist: userData.isEckist,
    dateOfBirth: userData.dateOfBirth,
    gender: userData.gender,
    mailingListPreference: userData.mailingListPreference
  };

  const user = await executeRegisterUser(userInfo);
  return toRegisterUserResponse(user);
};

export { registerUser };
