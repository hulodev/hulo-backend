import express from 'express';
import mongoose from 'mongoose';
import routes from './router';
import dotenv from 'dotenv';
import logger from './util/app/logger';
import errorHandler from './middleware/error-handler';
import authHandler from './middleware/auth-handler';
import { asyncRoute, getValidatedEnv } from './util/app/util';
import { getLocation } from './controller/user-controller';

dotenv.config();

class Server {
  private app: express.Application;

  constructor() {
    this.app = express();
    this.config();
  }

  private config(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.routes();
  }

  private routes(): void {
    this.app.post('api/user/get-location', asyncRoute(getLocation));
    this.app.use(authHandler);
    this.app.use('/api', routes);
    this.app.use(errorHandler);
  }

  public async start(): Promise<void> {
    try {
      await mongoose.connect(getValidatedEnv('MONGO_URI'));
      logger.info('Successfully connected to MongoDB');
    } catch (error: unknown) {
      logger.error('Could not connect to MongoDB', error);
      process.exit(1);
    }

    const port = process.env.PORT;
    this.app.listen(port, () => {
      logger.info(`Server is listening on port ${port}`);
    });
  }
}

export default Server;
