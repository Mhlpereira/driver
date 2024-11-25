import { Request, Response } from "express";
import { RideService } from "../ride/ride.service";
import { DriverService } from "../driver/driver.service";
import { CorridaDTO } from "../driver/DTO/corridaDTO";
import { CreateRideDTO } from "./DTO/create-ride-DTO";
import { CustomerRidesDTO } from "./DTO/customer-rides-DTO";



export class RideController {

    private rideService: RideService;
    private driverService: DriverService;

    constructor(driverService: DriverService, rideService: RideService) {
        this.driverService = driverService;
        this.rideService = rideService;
    }



    async ConfirmRide(req: Request, res: Response): Promise<Response> {
        try {
            const createRideDTO: CreateRideDTO = req.body;

            if (!createRideDTO.origin || !createRideDTO.destination) {
                return res.status(400).json({
                    error_code: "INVALID_DATA",
                    error_description: "Os dados fornecidos no corpo da requisição são inválidos"
                })
            }

            const driver = await this.driverService.getDriverById(createRideDTO.driverId);
            if (!driver) {
                return res.status(404).json({
                    error_code: 'DRIVER_NOT_FOUND',
                    error_description: 'Motorista não encontrado'
                })
            }

            const ride = await this.rideService.confirmRide(createRideDTO);

            return res.status(200).json({ message: "operação realizado com sucesso.", data: ride })
        } catch (e) {
            console.error("Erro ao criar a corrida:", e.message);
            return res.status(400).json({
                error_code: "CREATE_RIDE_ERROR",
                error_description: "Erro ao criar a corrida"
            });
        }
    }

    async getAllRidesByUser(req: Request, res: Response): Promise<Response> {
       const customerRidesDTO: CustomerRidesDTO = req.body;

       //na hora de listar não estou conseguindo colocar como number e está aparecendo com any.

       const list = await this.rideService.getAllRidesByUser(customerRidesDTO.customerIdDTO)
    }
    
}