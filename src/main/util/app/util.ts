import { Request, Response, NextFunction } from 'express';
import { UndefinedEnvError } from './errors';

/**
 * Defines the shape of the endpoint controller.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AsyncRouteMethodType = (req: Request) => Promise<any>;

/**
 * Helper method that abstracts the async route execution logic.
 * @param routeMethod the endpoint to execute.
 * @param successStatusCode the status code returned when request is successful.
 * helper uses the default status code 200 when no status code is provided
 */
const asyncRoute = (routeMethod: AsyncRouteMethodType, successStatusCode = 200) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await routeMethod(req);
      res.status(successStatusCode).json(result);
    } catch (error: unknown) {
      next(error);
    }
  };
};

const getValidatedEnv = (envVar: string): string => {
  const envVarValue = process.env[envVar];
  if (!envVarValue) throw new UndefinedEnvError(`Environment variable ${envVar} is not defined`);
  return envVarValue;
};

export { asyncRoute, getValidatedEnv };
