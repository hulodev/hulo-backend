import { Router } from 'express';
import PersonController from '../dummyPerson/controllers/personController';

const app = Router();
const personController = new PersonController();

app.post('/create', personController.createPerson);

export default app;
