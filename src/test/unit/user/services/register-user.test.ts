import { HuloUserModel } from '../../../../main/user/models/hulo-user';
import executeRegisterUser from '../../../../main/user/services/register-user';
import { RegisterUserRequest } from '../../../../main/user/models/dto';
import { insertNewUser } from '../../../../main/dao/user-dao/dao';

jest.mock('../../../../main/dao/user-dao/dao');

describe('execute register user', () => {
  const firstName = 'FirstName';
  const lastName = 'LastName';
  const emailAddress = 'email@email.com';
  const username = 'Name';
  const dateOfBirth = '1995-10-01';
  const gender = 'FEMALE';
  const userId = '3555';

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
      mailingListPreference: true
    }
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

  it('should save a hulo user and return the saved information', async () => {
    // given there is a valid input
    (insertNewUser as jest.Mock).mockResolvedValue(executeRegisterUserResponse);
    // when
    const result = await executeRegisterUser(req);
    // then
    expect(result.userId).toEqual(userId);
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
