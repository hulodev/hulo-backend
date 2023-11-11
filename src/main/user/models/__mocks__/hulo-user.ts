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

const mock = {
  save: jest.fn().mockResolvedValue(userData)
};
export default jest.fn().mockImplementation(() => mock);
