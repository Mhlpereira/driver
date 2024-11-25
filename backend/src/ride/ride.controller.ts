import { Request, Response } from "express";
import { RideService } from "../ride/ride.service";
import { DriverService } from "../driver/driver.service";
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
        try {
            const { customerId, driverId }: CustomerRidesDTO = req.body;

            const list = driverId ? this.rideService.getAllRidesByUserAndDriver(customerId, driverId)
                : this.rideService.getAllRidesByUser(customerId);


            const driver = await this.driverService.getDriverById(driverId);
            if (!driver) {
                return res.status(400).json({
                    error_code: 'INVALID_DRIVER',
                    error_description: 'Motorista inválido'
                })
            }

            if ((await list).rides === 0) {
                return res.status(400).json({
                    error_code: 'NO_RIDES_FOUND',
                    error_description: 'Nenhum registro encontrado'
                })
            }

            return res.status(200).json(list)
        } catch (e) {
            console.error("Erro ao carregar a lista:", e.message);
            return res.status(400).json({
                error_code: "LIST_ERROR",
                error_description: 'Erro ao listar as corridas'
            })
        }
    }

}