import { PrismaClient } from "@prisma/client";
import { CreateRideDTO } from "./DTO/create-ride-DTO";
import { DriverService } from "../driver/driver.service";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CustomerRidesDTO } from "./DTO/customer-rides-DTO";

const prisma = new PrismaClient();


export class RideService{
    
    constructor(private driverService: DriverService) { }

    async createRide(createRideDTO: CreateRideDTO) {
       
        try{
            const { origin, destination, driverId, customerId } = createRideDTO;

            const distanceTime =  await this.driverService.calculateDistanceAndTime(origin, destination);

            const driverWithPrice = await this.driverService.getAllDrivers(distanceTime);

            const selectDriver = driverWithPrice.find(driver => driver.driverId === driverId);

            if(!selectDriver){
                throw new Error("Motorista não encontrado");
            }

            if(!customerId){
                throw new Error("Usuário não validado")
            }
            const ride = await prisma.ride.create({
                data:{
                    customerId,
                    origin,
                    destination,
                    distance: distanceTime.distance,
                    duration: distanceTime.duration,
                    driver: {
                        id: selectDriver.driverId,
                        name: selectDriver.driverName
                    },
                    value: selectDriver.price
                }
            });
            return ride;
        } catch (e) {
            console.error("Erro ao criar a corrida", e);
            throw new Error("Erro ao criar a corrida!");
        }
        
        
    }
    

    async getAllRidesByUser(customerRidesDTO: CustomerRidesDTO){
        try{
            const { customerIdDTO, driverIdDTO } = customerRidesDTO;
            
            const customerRides = await prisma.ride.findmany({
                where : {
                    customerId : customerIdDTO,
                    ...(driverIdDTO ? {driverId: driverIdDTO} : {})
                },
                include : {
                    driver: true
                },
                orderBy:{
                    date: "desc"
                }
            });

            const formattedRides = customerRides.map((ride) => ({ //verificar esse código amanhã
                id: ride.id,
                date: format(new Date(ride.date), 'dd/MM/yyyy HH:mm:ss', { locale: ptBR }),
                origin: ride.origin,
                destination: ride.destination,
                distance: ride.distance,
                duration: ride.duration,
                driver: {
                    id: ride.driver.id,
                    name: ride.driver.name,
                },
                value: ride.price,
            }));

            return {
                customer_id: customerRides.customer_id,
                rides: formattedRides,
            };
        } catch(e){
            console.error("Erro ao buscar corrida de usuários", e);
            throw new Error("Não foi possível buscar corrida");
        }
    }

}