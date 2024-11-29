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

    async estimateRide(req: Request, res: Response) : Promise<Response>{
        const { customer_id, origin, destination, driver_id } = req.body;

        if ( !origin || !destination || !customer_id ) {
           
            return res.status(400).json({ error: "Dados incompletos destination" });
        }
      
        const createRideDTO = new CreateRideDTO(customer_id, origin, destination);
        res.status(200).send({ sucess: true , message:"Operação realizada com sucesso" , data: createRideDTO})
    }

    async ConfirmRide(req: Request, res: Response): Promise<Response> {
        try {
            const createRideDTO: CreateRideDTO = req.body;
            console.log(createRideDTO, "erro aqui!");
            if (!createRideDTO.origin || !createRideDTO.destination) {
                return res.status(400).json({
                    error_code: "INVALID_DATA",
                    error_description: "Os dados fornecidos no corpo da requisição são inválidos"
                })
            }

            const driver = await this.driverService.getDriverById(createRideDTO.driver_id);
            if (!driver) {
                return res.status(404).json({
                    error_code: 'DRIVER_NOT_FOUND',
                    error_description: 'Motorista não encontrado'
                })
            }
            const distance = await this.rideService.calculateDistanceAndTime(createRideDTO.origin, createRideDTO.destination)
            if(driver.minKm < distance.distance){
                return res.status(406).json({
                    "error_code": "INVALID_DISTANCE",
                    "error_description": "Quilometragem inválida para o motorista."
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

            const list = await this.rideService.getAllRidesByUserAndDriver(customerId, driverId)

            const driver = await this.driverService.getDriverById(driverId);
            if (!driver) {
                return res.status(400).json({
                    error_code: 'INVALID_DRIVER',
                    error_description: 'Motorista inválido'
                })
            }

            if (list.rides.length === 0) {
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

    async listAllDrivers(req: Request, res: Response): Promise<Response> {
        try {
            const { origin, destination} = req.body;
            console.log(origin, destination, 'começo do pedido!')
            const distanceTime = await this.rideService.calculateDistanceAndTime(origin, destination);
            console.log(distanceTime, 'depois do metodo calcular corrida')
            const drivers = await this.driverService.listAllDrivers(distanceTime);
            console.log(drivers, 'teste')

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