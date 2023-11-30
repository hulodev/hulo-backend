import logger from '../../utils/logger';
import { HuloUserModel } from '../../user/models/hulo-user';

const insertNewUser = async (huloUser: HuloUserModel) => {
  try {
    const savedHuloUser = await huloUser.save();
    logger.info(`Hulo User ${huloUser.userId} has been successfully saved.`);
    return savedHuloUser;
  } catch (error) {
    logger.warn(`An error occurred while trying to save user: ${huloUser.userId}.`);
    throw error;
  }
};

export { insertNewUser };
