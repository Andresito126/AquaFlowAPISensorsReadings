import { MeasurementRepository } from "../../domain/repositories/IMeasurement_repository";
import { MeasurementDTO } from "../dtos/inputs/Measurement_dto";
import { MeasurementMapper } from "../mappers/Measurement_mapper";
import { WeatherService } from "../services/Weather_service";

export class CreateMeasurementUseCase {
  constructor(
    private readonly measurementRepository: MeasurementRepository,
    private readonly weatherService: WeatherService
  ){}

  async execute(measurementDTO: MeasurementDTO): Promise<void> {
    const temperature = await this.weatherService.execute('Suchiapa');
    console.log(temperature)
    const measurement = MeasurementMapper.toMeasurement(measurementDTO);
    await this.measurementRepository.createMeasurement(measurement, temperature);  
  } 

}