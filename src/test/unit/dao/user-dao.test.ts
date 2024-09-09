import HuloUser, { HuloUserModel } from '../../../main/model/schemas/hulo-user';
import { findUser, insertNewUser } from '../../../main/dao/user-dao';

const saveMethod = jest.fn();

jest.mock('../../../main/model/schemas/hulo-user', () => {
  return jest.fn().mockImplementation(() => {
    return {
      save: saveMethod
    };
  });
});

HuloUser.findOne = jest.fn();

describe('User DAO Tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  //Test for insertNewUser
  describe('Insert New User', () => {
    const firstName = 'FirstName';
    const lastName = 'LastName';
    const emailAddress = 'email@email.com';
    const username = 'Username';
    const dateOfBirth = '1990-10-01';
    const gender = 'FEMALE';
    const userId = '3555';

    const huloUserModel = {
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

    const HuloUserInfo = {
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

    it('should save a new hulo user document', async () => {
      // given
      saveMethod.mockResolvedValue(huloUserModel);
      const huloUser = new HuloUser(HuloUserInfo);

      // when & then
      await expect(insertNewUser(huloUser)).resolves.not.toThrow();
      expect(huloUser.save).toHaveBeenCalledTimes(1);
    });

    it('should handle error when inserting a new user fails', async () => {
      // given
      const huloUser = new HuloUser(HuloUserInfo);
      const error = new Error('Insert New User Error');
      saveMethod.mockRejectedValue(error);

      // when & then
      await expect(insertNewUser(huloUser)).rejects.toThrow(error);
    });
  });

  // Test for findUser
  describe('Find A User', () => {
    it('should return a user if found', async () => {
      // given
      const huloUser = {
        userId: '1010',
        emailAddress: 'testemail@address.com'
      };
      (HuloUser.findOne as jest.Mock).mockResolvedValue(huloUser);

      // when
      const result = await findUser('1010', 'testemail@address.com');

      //then
      expect(HuloUser.findOne).toHaveBeenCalledWith({
        emailAddress: 'testemail@address.com',
        userId: '1010'
      });
      expect(result).toEqual(huloUser);
    });

    it('should return null if no user is found', async () => {
      // given
      (HuloUser.findOne as jest.Mock).mockResolvedValue(null);

      // when
      const result = await findUser('2345', 'invalid@address.com');

      // then
      expect(result).toBeNull();
      expect(HuloUser.findOne).toHaveBeenCalledWith({
        emailAddress: 'invalid@address.com',
        userId: '2345'
      });
    });

    it('should throw an error if findOne fails', async () => {
      // given
      (HuloUser.findOne as jest.Mock).mockRejectedValue(new Error('An unknown error occured'));

      // when & then
      await expect(findUser('2345', 'invalid@address.com')).rejects.toThrow(
        'An unknown error occured'
      );
    });
  });
});
