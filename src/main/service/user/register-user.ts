import HuloUser, { HuloUserModel } from '../../model/schemas/hulo-user';
import { insertNewUser, findUser } from '../../dao/user-dao';
import { RegisterUserRequest, RegisterUserResponse } from '../../model/dto/user/register-user-dto';
import Location, { LocationData } from '../../model/schemas/location';
import { saveLocation } from '../../dao/location-dao';
import { ExistingUserError } from '../../util/app/errors';

const executeRegisterUser = async (req: RegisterUserRequest): Promise<RegisterUserResponse> => {
  const userData = req.body;
  const userId = req.userId;

  // check if user exist
  const checkUser = await findUser(userId, userData.emailAddress);
  if (checkUser) {
    throw new ExistingUserError(`User already exists`);
  }

  // Proceed to save user if user doesn't exist
  const userInfo = {
    ...userData,
    userId
  };

  const huloUser: HuloUserModel = new HuloUser(userInfo);
  await insertNewUser(huloUser);

  // save user's location
  const locationInfo: LocationData = {
    ...userData.location,
    userId
  };
  const locationModel = new Location(locationInfo);
  await saveLocation(locationModel);

  return {
    message: 'Success!'
  };
};

export default executeRegisterUser;
