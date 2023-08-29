import express from 'express';
import mongoose from 'mongoose';
import routes from './router';
import dotenv from 'dotenv';
import logger from './utils/logger';
import errorHandler from './middleware/error-handler';

dotenv.config();

class Server {
  private app: express.Application;

  constructor() {
    this.app = express();
    this.config();
  }

  private async config(): Promise<void> {
    try {
      await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/hulo');
      logger.info('Successfully connected to MongoDB');
    } catch (error) {
      logger.error('Could not connect to MongoDB', error);
    }
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.routes();
  }

  private routes(): void {
    this.app.use('/api', routes);
    this.app.use(errorHandler);
  }

  public start(): void {
    const port = process.env.PORT || 3000;
    this.app.listen(port, () => {
      logger.info(`Server is listening on port ${port}`);
    });
  }
}

export default Server;
