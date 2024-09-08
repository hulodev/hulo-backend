import { LocationModel } from '../model/schemas/location';
import logger from '../util/app/logger';

/**
 * Method to save a location object.
 */
const saveLocation = async (location: LocationModel): Promise<LocationModel> => {
  try {
    const savedLocation = location.save();
    logger.info(`Location for ${location.userId} has been successfully saved.`);
    return savedLocation;
  } catch (error: unknown) {
    logger.warn(`An error occurred while trying to save location for ${location.userId}.`);
    throw error;
  }
};

export { saveLocation };
