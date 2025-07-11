import { Request, Response } from "express";
import { CreateMeasurementUseCase } from "../../application/useCases/CreateMeasurement_useCase";
import { MeasurementDTO } from "../../application/dtos/inputs/Measurement_dto";
import { InvalidArgumentError } from "../../../shared/errors/InvalidArgument_error";

export class CreateMeasurementController {

  constructor(private readonly createMeasurementUseCase: CreateMeasurementUseCase){}

  execute = async (req: Request, res: Response): Promise<any> => {

    const measurementDTO = req.body as MeasurementDTO;

    try {

      await this.createMeasurementUseCase.execute(measurementDTO);

      return res.status(201).json({ message: "Measurement created successfully" });

    } catch (err) {

      if (err instanceof InvalidArgumentError) {
        return res.status(err.statusCode).json({ status: "Error", message: err.message });
      }

      if (err instanceof Error){
        return res.status(500).send({ status: "Error", message: err.message });
      }

      return res.status(500).send({ status: "Error", message: "Server error: unknown error" });

    }

  }
  
}