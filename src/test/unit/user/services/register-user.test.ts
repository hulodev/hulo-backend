import HuloUser from '../../../../main/user/models/hulo-user';
import executeRegisterUser from '../../../../main/user/services/register-user';
import logger from '../../../../main/utils/logger';

jest.mock('../../../../main/user/models/hulo-user');
jest.mock('../../../../main/utils/logger');

describe('execute register user', () => {
  const firstName = 'Rhee';
  const lastName = 'Bell';
  const emailAddress = 'rhbell@rh.com';
  const username = 'rhee';
  const dateOfBirth = '101010';
  const gender = 'Female';
  const userId = '3555';

  const userData = {
    userId,
    firstName,
    lastName,
    emailAddress,
    username,
    isEckist: true,
    dateOfBirth,
    gender,
    mailingListPreference: true
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should save a hulo user and return the saved information', async () => {
    const result = await executeRegisterUser(userData);

    expect(HuloUser).toHaveBeenCalledWith(userData);
    expect(logger.info).toHaveBeenCalledWith('Hulo User has been successfully saved.');
    expect(result).toEqual(userData);
  });
});
