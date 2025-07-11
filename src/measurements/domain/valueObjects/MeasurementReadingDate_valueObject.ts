import { InvalidArgumentError } from "../../../shared/errors/InvalidArgument_error";

export class MeasurementReadingDate {
  constructor(readonly value: Date) {
    this.ensureValueIsDefined(value);
    this.ensureDateIsValid(value);
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
