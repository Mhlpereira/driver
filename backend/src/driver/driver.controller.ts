import { Request, Response } from "express";
import { DriverService } from "./driver.service";
import { CorridaDTO } from "./DTO/corridaDTO";



export class DriverController {

    constructor(private driverService: DriverService) { }

    async listAllDrivers(req: Request, res: Response): Promise<Response> {
        try {
            const { origin, destination, customerId}: CorridaDTO = req.body;

            const distanceTime = await this.driverService.calculateDistanceAndTime(origin, destination);
            const drivers = await this.driverService.listAllDrivers(distanceTime);

            if(distanceTime.distance <= drivers.minKm){
                return res.status(406).json({
                    "error_code": "INVALID_DISTANCE",
                    "error_description": "Quilometragem inválida para o motorista."
                })
            }
            return res.status(200).json({ success: true, description: "Operação realizado com sucesso" ,data: drivers })
        } catch (e) {
            console.error("Error ao listar os motoristas", e.message);
            return res.status(500).json({
                error_code: "INTERNAL_SERVER_ERROR",
                error_description: "Um erro inexperado aconteceu"
            })
        }
    }

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