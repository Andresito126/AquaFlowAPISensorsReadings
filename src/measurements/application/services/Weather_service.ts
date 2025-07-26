import { WeatherRepository } from "../repositories/IWeather_repository";

export class WeatherService {
  constructor(private readonly weatherRepository: WeatherRepository){}

  async execute(city: string): Promise<number> {
    return await this.weatherRepository.getTemperatureByCity(city);
  }

}