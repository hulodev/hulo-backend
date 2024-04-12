import HuloUser, { HuloUserModel } from '../../../main/model/schemas/hulo-user';
import { insertNewUser } from '../../../main/dao/user-dao';

const saveMethod = jest.fn();

jest.mock('../../../main/model/schemas/hulo-user', () => {
  return jest.fn().mockImplementation(() => {
    return {
      save: saveMethod
    };
  });
});

const firstName = 'FirstName';
const lastName = 'LastName';
const emailAddress = 'email@email.com';
const username = 'Username';
const dateOfBirth = '1990-10-01';
const gender = 'FEMALE';
const userId = '3555';

const HuloUserDoc = {
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

describe('InsertNewUser', () => {
  it('should save a document and return a saved hulo user ', async () => {
    // given
    saveMethod.mockResolvedValue(HuloUserDoc);
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
    // then
    await expect(insertNewUser(huloUser)).rejects.toThrow(error);
  });
});
