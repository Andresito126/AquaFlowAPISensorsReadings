import { config } from "../../../core/config";
import { WeatherRepository } from "../../application/repositories/IWeather_repository";

export class Weather implements WeatherRepository {
  private async geocodeCity(city: string, countryCode = "MX"): Promise<{ lat: number; lon: number }> {
    
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)},${countryCode}&limit=1&appid=${config.WEATHER_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok || !data.length) {
      throw new Error(`City "${city}" not found`);
    }

    return {
      lat: data[0].lat,
      lon: data[0].lon
    };
  }

  private async getTemperatureByCoords(lat: number, lon: number): Promise<number> {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${config.WEATHER_API_KEY}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok || !data.main?.temp) {
      throw new Error(data.message || "Invalid weather data");
    }

    return data.main.temp;
  }

  async getTemperatureByCity(city: string, countryCode = "MX"): Promise<number> {
    const { lat, lon } = await this.geocodeCity(city, countryCode);
    return this.getTemperatureByCoords(lat, lon);
  }

}
