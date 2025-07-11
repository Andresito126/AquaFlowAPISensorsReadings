import { InvalidArgumentError } from "../../../shared/errors/InvalidArgument_error";
import { MeasurementRepository } from "../../domain/repositories/IMeasurement_repository";

export class GetMeasurementsUseCase {
  constructor(private readonly measurementRepository: MeasurementRepository){}

  async execute(date: string): Promise<void> {

    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      throw new InvalidArgumentError(`Invalid date format: ${date}. Expected format: YYYY-MM-DD`);
    }

    return await this.measurementRepository.getMeasurements(date);  
  } 

}