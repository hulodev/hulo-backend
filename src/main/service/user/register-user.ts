import HuloUser, { HuloUserData, HuloUserModel } from '../../model/schemas/hulo-user';
import { insertNewUser } from '../../dao/user-dao';
import { RegisterUserRequest } from '../../model/dto/user/register-user-dto';

const executeRegisterUser = async (req: RegisterUserRequest): Promise<HuloUserModel> => {
  const userData = req.body;
  const userInfo: HuloUserData = {
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
  const huloUser: HuloUserModel = new HuloUser(userInfo);
  return await insertNewUser(huloUser);
};

export default executeRegisterUser;
