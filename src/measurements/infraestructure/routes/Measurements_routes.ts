import express from 'express';
import { getMeasurementsController } from '../dependencies';

export const measurementRouter = express.Router();

measurementRouter.get("/", getMeasurementsController.execute);