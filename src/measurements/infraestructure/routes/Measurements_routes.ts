import express from 'express';
import { createMeasurementController, getMeasurementsController } from '../dependencies';

export const measurementRouter = express.Router();

measurementRouter.post("/", createMeasurementController.execute);
measurementRouter.get("/", getMeasurementsController.execute);