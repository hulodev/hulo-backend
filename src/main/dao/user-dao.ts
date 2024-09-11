import logger from '../util/app/logger';
import HuloUser, { HuloUserModel } from '../model/schemas/hulo-user';

/**
 * Method to insert a new user into mongodb.
 */
const insertNewUser = async (huloUser: HuloUserModel): Promise<void> => {
  try {
    await huloUser.save();
    logger.info(`Hulo User ${huloUser.userId} has been successfully saved.`);
  } catch (error: unknown) {
    logger.error(`An error occurred while trying to save user: ${huloUser.userId}.`);
    throw error;
  }
};

/**
 * Method to find a user
 */
const findUser = async (userId: string, emailAddress: string): Promise<HuloUserModel | null> => {
  try {
    return await HuloUser.findOne({ emailAddress, userId });
  } catch (error: unknown) {
    logger.error(`An error occurred while trying to find user: ${userId}.`);
    throw error;
  }
};
export { insertNewUser, findUser };
