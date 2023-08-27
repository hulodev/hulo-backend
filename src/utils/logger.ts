import pino from 'pino';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Pino logger config with pretty output format.
 */
class Logger {
  // this value will be used to set the logger in the production environment
  private static readonly isProd: boolean = process.env.NODE_ENV === 'prod';
  public static readonly logger = pino({
    level: 'debug',
    transport: Logger.isProd
      ? undefined
      : {
          target: 'pino-pretty',
          options: {
            colorize: true
          }
        }
  });
}

export default Logger.logger;
