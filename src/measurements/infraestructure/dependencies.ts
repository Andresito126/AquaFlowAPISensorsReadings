import { GetMeasurementsUseCase } from "../application/useCases/GetMeasurements_useCase";
import { PostgreSQL } from "./adapters/PostgreSQL";
import { GetMeasurementsController } from "./controllers/GetMeasurements_controller";

const postgreSQL = new PostgreSQL();

const getMeasurementsUseCase = new GetMeasurementsUseCase(postgreSQL);

export const getMeasurementsController = new GetMeasurementsController(getMeasurementsUseCase);