import { Request, Response } from "express";
import { DriverService } from "./driver.service";



export class DriverController {

    constructor(private driverService: DriverService) { }

    async getDriverById(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const driver = await this.driverService.getDriverById(Number(id));

            if (!driver) {
                return res.status(404).json({
                    error_code: "DRIVER_NOT_FOUND",
                    error_description: "Motorista não encontrado.",
                });
            }

            return res.status(200).json(driver);
        } catch (e) {
            console.error("Error ao buscar o motorista:", e);
            return res.status(500).json({
                error_code: "INTERNAL_SERVER_ERROR",
                error_description: "Erro ao processar a solicitação."
            })
        }
    }

}