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
                    error_description: "Origem ou destino inválido!"
                })
            }

            const distanceTime = await this.driverService.calculateDistanceAndTime(origin, destination);
            const drivers = await this.driverService.getAllDrivers(distanceTime);
            return res.status(200).json({ success: true, data: drivers })
        } catch (e) {
            console.error("Erro calculando a distancia", e.message);
            return res.status(500).json({
                error_code: "INTERNAL_SERVER_ERROR",
                error_description: "Um erro inexperado aconteceu"
            })
        }
    }

}