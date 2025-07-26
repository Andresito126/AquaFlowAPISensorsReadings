export interface WeatherRepository {
  getTemperatureByCity(city: string): Promise<number>
}