import HuloUser, { HuloUserModel } from '../../model/schemas/hulo-user';
import { insertNewUser } from '../../dao/user-dao';
import { RegisterUserRequest, RegisterUserResponse } from '../../model/dto/user/register-user-dto';
import Location, { LocationData } from '../../model/schemas/location';
import { saveLocation } from '../../dao/location-dao';

const executeRegisterUser = async (req: RegisterUserRequest): Promise<RegisterUserResponse> => {
  const userData = req.body;
  const locationInfo: LocationData = {
    ...userData.location,
    userId: req.userId
  };
  const locationModel = new Location(locationInfo);
  // todo: address updating the location if one exists or use a transactional session
  const savedLocation = await saveLocation(locationModel);

  const userInfo = {
    ...userData,
    location: savedLocation._id
  };
  const huloUser: HuloUserModel = new HuloUser(userInfo);
  await insertNewUser(huloUser);
  return {
    message: 'Success!'
  };
};

export default executeRegisterUser;
