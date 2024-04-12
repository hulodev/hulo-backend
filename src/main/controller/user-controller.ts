import { RegisterUserRequest, RegisterUserResponse } from '../model/dto/user/register-user-dto';
import { toGetLocationResponse } from '../util/user/mapper';
import executeRegisterUser from '../service/user/register-user';
import logger from '../util/app/logger';
import reverseGeocode from '../external-api/radar/radar';
import { GetLocationRequest, GetLocationResponse } from '../model/dto/user/get-location-dto';

/**
 * Method to register a new Hulo User.
 */
const registerUser = async (req: RegisterUserRequest): Promise<RegisterUserResponse> => {
  logger.info(`Begin registration of user: ${req.userId}`);
  return executeRegisterUser(req);
};

/**
 * Method to get a user's address given location coordinates.
 */
const getLocation = async (req: GetLocationRequest): Promise<GetLocationResponse> => {
  const { latitude, longitude } = req.body;
  logger.info(`Attempting to get location for user: ${req.userId}`);
  const radarLocation = await reverseGeocode(latitude, longitude);
  return toGetLocationResponse(radarLocation);
};

export { registerUser, getLocation };
