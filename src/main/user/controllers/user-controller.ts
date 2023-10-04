import { RegisterUserRequest, RegisterUserResponse } from '../models/dto';
import { toRegisterUserResponse } from '../util/util';
import executeRegisterUser from '../services/register-user';

const registerUser = async (req: RegisterUserRequest): Promise<RegisterUserResponse> => {
  const {
    firstName,
    lastName,
    emailAddress,
    username,
    isEckist,
    dateOfBirth,
    gender,
    mailingListPreference
  } = req.body;

  const userId = req.userId;
  const userInfo = {
    userId,
    firstName,
    lastName,
    emailAddress,
    username,
    isEckist,
    dateOfBirth,
    gender,
    mailingListPreference
  };

  const user = await executeRegisterUser(userInfo);
  return toRegisterUserResponse(user);
};

export { registerUser };
