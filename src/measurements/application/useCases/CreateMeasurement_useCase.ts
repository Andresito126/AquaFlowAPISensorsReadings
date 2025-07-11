import { MeasurementRepository } from "../../domain/repositories/IMeasurement_repository";
import { MeasurementDTO } from "../dtos/inputs/Measurement_dto";
import { MeasurementMapper } from "../mappers/Measurement_mapper";

export class CreateMeasurementUseCase {
  constructor(private readonly measurementRepository: MeasurementRepository){}

  async execute(measurementDTO: MeasurementDTO): Promise<void> {
    const measurement = MeasurementMapper.toMeasurement(measurementDTO);
    await this.measurementRepository.createMeasurement(measurement);  
  } 

}