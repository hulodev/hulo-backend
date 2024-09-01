import HuloUser, { HuloUserModel } from '../../model/schemas/hulo-user';
import { insertNewUser } from '../../dao/user-dao';
import { RegisterUserRequest, RegisterUserResponse } from '../../model/dto/user/register-user-dto';
import Location, { LocationData } from '../../model/schemas/location';
import { saveLocation } from '../../dao/location-dao';

const executeRegisterUser = async (req: RegisterUserRequest): Promise<RegisterUserResponse> => {
  const userData = req.body;
  const userId = req.userId;

  const userInfo = {
    ...userData,
    userId
  };
  const huloUser: HuloUserModel = new HuloUser(userInfo);
  await insertNewUser(huloUser);

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
