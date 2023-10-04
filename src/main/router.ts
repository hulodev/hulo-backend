import { Router } from 'express';
import { asyncRoute } from './utils/util';
import { createPerson, getAge } from './dummy-person/controllers/person-controller';
import { registerUser } from './user/controllers/user-controller';

/**
 * This file contains all the application routes.
 * Use a comment header for each group of routes.
 */

const app = Router();

/* person routes */
app.post('/person/create', asyncRoute(createPerson, 201));
app.get('person/get-age', asyncRoute(getAge)); // returns default 200

/* user routes */
app.post('/user/register', asyncRoute(registerUser));
export default app;
