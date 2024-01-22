import { HuloUserModel } from '../../model/schemas/hulo-user';
import { RegisterUserResponse } from '../../model/dto/user/register-user-dto';
import { GetLocationResponse } from '../../model/dto/user/get-location-dto';
import { RadarLocationResponse } from '../../external-api/radar/dto';

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

export const toGetLocationResponse = (
  radarLocation: RadarLocationResponse
): GetLocationResponse => {
  // radar places the address properties as a single item in the address array
  const address = radarLocation.addresses[0];
  return {
    country: address.country,
    countryCode: address.countryCode,
    countryFlag: address.countryFlag,
    state: address.state,
    city: address.city
  };
};
