import { Measurement } from "../../domain/entities/Measurement";
import { MeasurementId } from "../../domain/valueObjects/MeasurementId_valueObject";
import { MeasurementReadingDate } from "../../domain/valueObjects/MeasurementReadingDate_valueObject";
import { MeasurementValue } from "../../domain/valueObjects/MeasurementValue_valueObject";
import { SensorId } from "../../domain/valueObjects/SensorId_valueObject";
import { MeasurementDTO } from "../dtos/inputs/Measurement_dto";

export class MeasurementMapper {

  static toMeasurement({ measurementId, sensorId, value, readingDate }: MeasurementDTO): Measurement {
    return new Measurement(
      new MeasurementId(measurementId),
      new SensorId(sensorId),
      new MeasurementValue(value),
      new MeasurementReadingDate(readingDate)
    )
  }

}