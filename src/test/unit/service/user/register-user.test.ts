import executeRegisterUser from '../../../../main/service/user/register-user';
import { RegisterUserRequest } from '../../../../main/model/dto/user/register-user-dto';
import { insertNewUser } from '../../../../main/dao/user-dao';
import { saveLocation } from '../../../../main/dao/location-dao';

jest.mock('../../../../main/dao/user-dao');
jest.mock('../../../../main/dao/location-dao');

describe('ExecuteRegisterUser', () => {
  const firstName = 'FirstName';
  const lastName = 'LastName';
  const emailAddress = 'email@email.com';
  const username = 'Name';
  const dateOfBirth = '1995-10-01';
  const gender = 'FEMALE';
  const userId = '3555';
  const location = {
    country: 'United States',
    countryCode: 'US',
    countryFlag: '🇺🇸',
    state: 'New York',
    city: 'Brooklyn'
  };

  const req = {
    userId,
    body: {
      firstName,
      lastName,
      emailAddress,
      username,
      isEckist: true,
      dateOfBirth,
      gender,
      mailingListPreference: true,
      location
    }
  } as RegisterUserRequest;

  const executeRegisterUserResponse = {
    message: 'Success!'
  };

  it('should save a hulo user and location', async () => {
    // given there is a valid input
    (insertNewUser as jest.Mock).mockResolvedValue({});
    (saveLocation as jest.Mock).mockResolvedValue({});
    // when
    const result = await executeRegisterUser(req);
    // then
    expect(result).toEqual(executeRegisterUserResponse);
    expect(insertNewUser).toHaveBeenCalledTimes(1);
    expect(saveLocation).toHaveBeenCalledTimes(1);
  });
});
