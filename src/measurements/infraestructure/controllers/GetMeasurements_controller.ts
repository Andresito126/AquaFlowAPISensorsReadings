import { Request, Response } from "express";
import { GetMeasurementsUseCase } from "../../application/useCases/GetMeasurements_useCase";
import { InvalidArgumentError } from "../../../shared/errors/InvalidArgument_error";

export class GetMeasurementsController {
  
  constructor(private readonly getMeasurementsUseCase: GetMeasurementsUseCase){}

  execute = async (req: Request, res: Response): Promise<any> => {
    try {

      const date = req.query.date as string;

      if (!date) {
        return res.status(400).json({ error: "The 'date' parameter is required" });
      }

      const mediciones = await this.getMeasurementsUseCase.execute(date);

      return res.status(200).json(mediciones);

    } catch (err) {
      if (err instanceof InvalidArgumentError) {
        return res.status(err.statusCode).json({ status: "Error", message: err.message });
      }

      if (err instanceof Error){
        return res.status(500).send({ status: "Error", message: err.message });
      }

      return res.status(500).send({ status: "Error", message: "Server error: unknown error" });
    }
  };
} 

