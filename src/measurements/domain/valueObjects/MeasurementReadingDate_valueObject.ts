import { InvalidArgumentError } from "../../../shared/errors/InvalidArgument_error";

export class MeasurementReadingDate {
  readonly value: Date;

  constructor(value: Date | string) {
    const dateValue = this.convertToDate(value);
    this.ensureValueIsDefined(dateValue);
    this.ensureDateIsValid(dateValue);
    this.value = dateValue;
  }

  private convertToDate(value: Date | string): Date {
    if (typeof value === 'string') {
      const date = new Date(value);
      if (isNaN(date.getTime())) {
        throw new InvalidArgumentError("Invalid date format");
      }
      return date;
    }
    return value;
  }

  private ensureValueIsDefined(value: Date): void {
    if (value === undefined || value === null || !(value instanceof Date)) {
      throw new InvalidArgumentError("Reading date must be a valid Date object");
    }
  }

  private ensureDateIsValid(value: Date): void {
    if (value.getTime() > new Date().getTime()) {
      throw new InvalidArgumentError("Reading date cannot be in the future");
    }
  }
}