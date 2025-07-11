import { Measurement } from "../entities/Measurement";

export interface MeasurementRepository {
  createMeasurement(measurement: Measurement): Promise<void>;
  getMeasurements(date: string): Promise<any>;
}