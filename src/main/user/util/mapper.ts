import { HuloUserModel } from '../models/hulo-user';
import { RegisterUserResponse } from '../models/dto';

export const toRegisterUserResponse = (huloUser: HuloUserModel): RegisterUserResponse => {
  return {
    firstName: huloUser.firstName,
    lastName: huloUser.lastName,
    emailAddress: huloUser.emailAddress,
    username: huloUser.username,
    isEckist: huloUser.isEckist,
    dateOfBirth: huloUser.dateOfBirth,
    gender: huloUser.gender,
    mailingListPreference: huloUser.mailingListPreference
  };
};
