import HuloUser, { HuloUserData } from '../models/hulo-user';
import { insertNewUser } from '../../dao/user-dao/dao';
import { RegisterUserRequest } from '../models/dto';

const executeRegisterUser = async (req: RegisterUserRequest) => {
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
  const huloUser = new HuloUser(userInfo);
  return await insertNewUser(huloUser);
};

export default executeRegisterUser;
