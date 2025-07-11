import { MeasurementId } from "../valueObjects/MeasurementId_valueObject";
import { MeasurementReadingDate } from "../valueObjects/MeasurementReadingDate_valueObject";
import { MeasurementValue } from "../valueObjects/MeasurementValue_valueObject";
import { SensorId } from "../valueObjects/SensorId_valueObject";

export class Measurement {

  constructor(
    private readonly measurementId: MeasurementId,
    private readonly sensorId: SensorId,
    private readonly measurementValue: MeasurementValue,
    private readonly measurementReadingDate: MeasurementReadingDate
  ){}

  getMeasurementId(): string {
    return this.measurementId.value;
  }

  getSensorId(): string {
    return this.sensorId.value;
  }

  getValue(): number {
    return this.measurementValue.value;
  }

  getReadingDate(): Date {
    return this.measurementReadingDate.value;
  }

}