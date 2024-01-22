import { Router } from 'express';
import { asyncRoute } from './util/app/util';
import { getLocation, registerUser } from './controller/user-controller';

/**
 * This file contains all the application routes.
 * Use a comment header for each group of routes.
 */
const app = Router();

/* user routes */
app.post('/user/register', asyncRoute(registerUser));
app.post('/user/location', asyncRoute(getLocation));

export default app;
