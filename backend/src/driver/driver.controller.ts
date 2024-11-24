import { Request, Response } from "express";
import { DriverService } from "./driver.service";
import { RideService } from "../ride/ride.service";
import { CorridaDTO } from "./DTO/corridaDTO";


export class DriverController {

    constructor(private driverService: DriverService) { }

    async calculateDistance(req: Request, res: Response): Promise<Response> {
        try {
            const { origin, destination }: CorridaDTO = req.body;

            if (!origin || !destination) {
                return res.status(400).json({
                    error_code: "INVALID_DATA",
                    error_description: "Os dados fornecidos no corpo da requisição são inválidos"
                })
            }

            const distanceTime = await this.driverService.calculateDistanceAndTime(origin, destination);
            const drivers = await this.driverService.getAllDrivers(distanceTime);
            if (drivers.length <= 0) {
                return res.status(404).json({
                    "error_code": "DRIVER_NOT_FOUND",
                    "error_description": "Motorista não encontrado"
                })
            }
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

}