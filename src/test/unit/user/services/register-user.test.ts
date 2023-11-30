import HuloUser from '../../../../main/user/models/hulo-user';
import executeRegisterUser from '../../../../main/user/services/register-user';
import { RegisterUserRequest } from '../../../../main/user/models/dto';

const firstName = 'Rhee';
const lastName = 'Bell';
const emailAddress = 'rhbell@rh.com';
const username = 'rhee';
const dateOfBirth = '101010';
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
};

jest.mock('../../../../main/user/models/hulo-user', () => {
  return jest.fn().mockImplementation(() => {
    return {
      save: jest.fn().mockResolvedValue({ userId, ...req.body })
    };
  });
});

describe('execute register user', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should save a hulo user and return the saved information', async () => {
    // when
    const result = await executeRegisterUser(req as RegisterUserRequest);
    // then
    expect(HuloUser).toHaveBeenCalledWith({ userId, ...req.body });
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
