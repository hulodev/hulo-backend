import { RegisterUserRequest } from '../../../../main/user/models/dto';
import { registerUser } from '../../../../main/user/controllers/user-controller';
import executeRegisterUser from '../../../../main/user/services/register-user';
import { HuloUserModel } from '../../../../main/user/models/hulo-user';

jest.mock('../../../../main/user/services/register-user');

describe('register user', () => {
  const firstName = 'Rheedhar';
  const lastName = 'Bello';
  const emailAddress = 'rhbello@gmail.com';
  const username = 'rheedhar';
  const dateOfBirth = '10/01/1995';
  const gender = 'Female';
  const userId = '3555';

  const request = {
    body: {
      firstName,
      lastName,
      emailAddress,
      username,
      isEckist: true,
      dateOfBirth,
      gender,
      mailingListPreference: true
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
    mailingListPreference: true
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
  });
});
