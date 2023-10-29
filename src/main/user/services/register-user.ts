import HuloUser, { HuloUserModel } from '../models/hulo-user';
import logger from '../../utils/logger';

const executeRegisterUser = async (user: HuloUserModel): Promise<HuloUserModel> => {
  const huloUser: HuloUserModel = new HuloUser(user);
  const savedHuloUser = await huloUser.save();
  logger.info('Hulo User has been successfully saved.');
  return savedHuloUser;
};

export default executeRegisterUser;
