import { RegisterUserRequest } from '../../../main/model/dto/user/register-user-dto';
import { getLocation, registerUser } from '../../../main/controller/user-controller';
import executeRegisterUser from '../../../main/service/user/register-user';
import { HuloUserModel } from '../../../main/model/schemas/hulo-user';
import { RadarLocationResponse } from '../../../main/external-api/radar/dto';
import reverseGeocode from '../../../main/external-api/radar/radar';
import { GetLocationRequest } from '../../../main/model/dto/user/get-location-dto';

jest.mock('../../../main/service/user/register-user');
jest.mock('../../../main/external-api/radar/radar');

describe('RegisterUser', () => {
  const firstName = 'FirstName';
  const lastName = 'LastName';
  const emailAddress = 'Email@email.com';
  const username = 'Username';
  const dateOfBirth = '1995-10-01';
  const gender = 'FEMALE';
  const userId = '0000';
  const location = {
    country: 'United States',
    countryCode: 'US',
    countryFlag: '🇺🇸',
    state: 'New York',
    city: 'Brooklyn',
  }

  const request = {
    body: {
      firstName,
      lastName,
      emailAddress,
      username,
      isEckist: true,
      dateOfBirth,
      gender,
      mailingListPreference: true,
      location,
    },
    userId
  } as RegisterUserRequest;

  const executeRegisterUserResponse = {
    userId,
    firstName,
    lastName,
    emailAddress,
    username,
    isEckist: true,
    dateOfBirth,
    gender,
    mailingListPreference: true,
    location,
  } as HuloUserModel;

  it('should call executeRegisterUser and return a user response', async () => {
    // given there is a valid input
    (executeRegisterUser as jest.Mock).mockResolvedValue(executeRegisterUserResponse);

    // when
    const result = await registerUser(request);

    // then
    expect(executeRegisterUser).toHaveBeenCalledTimes(1);
    expect(result.firstName).toEqual(firstName);
    expect(result.lastName).toEqual(lastName);
    expect(result.emailAddress).toEqual(emailAddress);
    expect(result.username).toEqual(username);
    expect(result.isEckist).toBeTruthy();
    expect(result.dateOfBirth).toEqual(dateOfBirth);
    expect(result.gender).toEqual(gender);
    expect(result.mailingListPreference).toBeTruthy();
    expect(result.location).toEqual(location);
  });
});

describe('GetLocation', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should return a human readable location given valid coordinates', async () => {
    // given
    const request = {
      body: {
        latitude: 40.7039,
        longitude: -73.9867
      }
    } as GetLocationRequest;

    const locationDetails = {
      country: 'United States',
      countryCode: 'US',
      countryFlag: '🇺🇸',
      state: 'New York',
      city: 'Brooklyn'
    };

    // mock response
    const radarLocationResponse: RadarLocationResponse = {
      addresses: [{ ...locationDetails }]
    };
    (reverseGeocode as jest.Mock).mockResolvedValueOnce(radarLocationResponse);

    // when
    const result = await getLocation(request);

    // then
    expect(reverseGeocode).toHaveBeenCalledTimes(1);
    expect(result).toEqual(locationDetails);
  });
});
