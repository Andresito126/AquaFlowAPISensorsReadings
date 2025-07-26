import { Measurement } from "../entities/Measurement";

export interface MeasurementRepository {
  createMeasurement(measurement: Measurement, temperature: number): Promise<void>;
  getMeasurements(date: string): Promise<any>;
}