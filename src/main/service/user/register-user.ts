import HuloUser, { HuloUserData, HuloUserModel } from '../../model/schemas/hulo-user';
import { insertNewUser } from '../../dao/user-dao';
import {RegisterUserRequest, RegisterUserResponse} from '../../model/dto/user/register-user-dto';

const executeRegisterUser = async (req: RegisterUserRequest): Promise<RegisterUserResponse> => {
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
    mailingListPreference: userData.mailingListPreference,
    location: {
      country: userData.location.country,
      countryCode: userData.location.countryCode,
      countryFlag: userData.location.countryFlag,
      state: userData.location.state,
      city: userData.location.city
    }
  };
  const huloUser: HuloUserModel = new HuloUser(userInfo);
  await insertNewUser(huloUser);
  return {
    message: 'Success',
  }
};

export default executeRegisterUser;
