import { CreateMeasurementUseCase } from "../application/useCases/CreateMeasurement_useCase";
import { GetMeasurementsUseCase } from "../application/useCases/GetMeasurements_useCase";
import { PostgreSQL } from "./adapters/PostgreSQL";
import { CreateMeasurementController } from "./controllers/CreateMeasurement_controller";
import { GetMeasurementsController } from "./controllers/GetMeasurements_controller";

const postgreSQL = new PostgreSQL();

const createMeasurementUseCase = new CreateMeasurementUseCase(postgreSQL);
const getMeasurementsUseCase = new GetMeasurementsUseCase(postgreSQL);

export const createMeasurementController = new CreateMeasurementController(createMeasurementUseCase);
export const getMeasurementsController = new GetMeasurementsController(getMeasurementsUseCase);