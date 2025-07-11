import { Postgresql } from "../../../core/database/PostgreSQL";
import { MeasurementODTO } from "../../application/dtos/outputs/Measurement_dto";
import { MeasurementMapper } from "../../application/mappers/Measurement_mapper";
import { Measurement } from "../../domain/entities/Measurement";
import { MeasurementRepository } from "../../domain/repositories/IMeasurement_repository";

export class PostgreSQL implements MeasurementRepository {

  private conn = Postgresql.getInstance();

  async createMeasurement(measurement: Measurement): Promise<void> {
    const sql = `
      INSERT INTO sensors_readings (sensor_reading_id, sensor_id, value, recorded_at)
      VALUES ($1, $2, $3, $4)`;

    const params = [
      measurement.getMeasurementId(), 
      measurement.getSensorId(), 
      measurement.getValue(), 
      measurement.getReadingDate()
    ];

    await this.conn.query(sql, params);
  }

  async getMeasurements(date: string): Promise<MeasurementODTO[]> {
    const sql = `
      SELECT sr.value, sr.recorded_at, sm.name_sensor
      FROM sensors_readings sr
      JOIN sensors s ON sr.sensor_id = s.sensor_id
      JOIN sensors_models sm ON s.sensor_model_id = sm.sensor_model_id
      WHERE DATE(sr.recorded_at) = $1`;
    
    const result = await this.conn.query(sql, [date]);

    if (result.rows.length === 0) throw new Error(`No measurements found for date: ${date}`)

    return MeasurementMapper.toMeasurements(result.rows);

  }


}