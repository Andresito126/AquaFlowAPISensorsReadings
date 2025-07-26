import { Postgresql } from "../../../core/database/PostgreSQL";
import { MeasurementODTO } from "../../application/dtos/outputs/Measurement_dto";
import { MeasurementMapper } from "../../application/mappers/Measurement_mapper";
import { Measurement } from "../../domain/entities/Measurement";
import { MeasurementRepository } from "../../domain/repositories/IMeasurement_repository";

export class PostgreSQL implements MeasurementRepository {
  private conn = Postgresql.getInstance();

  async createMeasurement(measurement: Measurement,temperature: number): Promise<void> {
    await this.insertSensorReading(measurement);

    const sensorType = await this.getSensorType(measurement.getSensorId());

    if (sensorType === "Temperature") {
      console.log("Si cumple jeje")
      await this.insertTemperatureDelta(measurement, temperature);
    }
  }

  private async insertSensorReading(measurement: Measurement): Promise<void> {
    const sql = `
      INSERT INTO sensors_readings (sensor_reading_id, sensor_id, value, recorded_at)
      VALUES ($1, $2, $3, $4)
    `;

    const params = [
      measurement.getMeasurementId(),
      measurement.getSensorId(),
      measurement.getValue(),
      measurement.getReadingDate(),
    ];

    await this.conn.query(sql, params);
  }

  private async insertTemperatureDelta(measurement: Measurement,temperature: number): Promise<void> {
    const sql = `
      INSERT INTO temp_deltas (sensor_reading_id, temp_delta)
      VALUES ($1, $2)
    `;

    const params = [
      measurement.getMeasurementId(),
      (temperature - measurement.getValue()),
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

    if (result.rows.length === 0)
      throw new Error(`No measurements found for date: ${date}`);

    return MeasurementMapper.toMeasurements(result.rows);
  }

  private async getSensorType(sensorId: string): Promise<string> {
    const sql = `
      SELECT sm.name_sensor
      FROM sensors s
      JOIN sensors_models sm ON s.sensor_model_id = sm.sensor_model_id
      WHERE s.sensor_id = $1
    `;

    const result = await this.conn.query(sql, [sensorId]);

    if (result.rowCount === 0) {
      throw new Error(`Sensor with id ${sensorId} not found`);
    }

    return result.rows[0].name_sensor;
  }


}
