import logger from '../util/app/logger';
import { HuloUserModel } from '../model/schemas/hulo-user';

/**
 * Method to insert a new user into mongodb.
 */
const insertNewUser = async (huloUser: HuloUserModel): Promise<void> => {
  try {
    await huloUser.save();
    logger.info(`Hulo User ${huloUser.userId} has been successfully saved.`);
  } catch (error: unknown) {
    logger.warn(`An error occurred while trying to save user: ${huloUser.userId}.`);
    throw error;
  }
};

export { insertNewUser };
