import { WeatherService } from "../application/services/Weather_service";
import { CreateMeasurementUseCase } from "../application/useCases/CreateMeasurement_useCase";
import { GetMeasurementsUseCase } from "../application/useCases/GetMeasurements_useCase";
import { PostgreSQL } from "./adapters/PostgreSQL";
import { Weather } from "./adapters/Weather";
import { CreateMeasurementController } from "./controllers/CreateMeasurement_controller";
import { GetMeasurementsController } from "./controllers/GetMeasurements_controller";

const measurementRepository = new PostgreSQL();

const weatherRepository = new Weather()
const weatherService = new WeatherService(weatherRepository);

const createMeasurementUseCase = new CreateMeasurementUseCase(measurementRepository, weatherService);
const getMeasurementsUseCase = new GetMeasurementsUseCase(measurementRepository);

export const createMeasurementController = new CreateMeasurementController(createMeasurementUseCase);
export const getMeasurementsController = new GetMeasurementsController(getMeasurementsUseCase);