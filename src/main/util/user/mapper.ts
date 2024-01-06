import { HuloUserModel } from '../../model/schemas/hulo-user';
import { RegisterUserResponse } from '../../model/dto/user/register-user-dto';

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
