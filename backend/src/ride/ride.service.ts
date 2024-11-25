import { PrismaClient } from "@prisma/client";
import { CreateRideDTO } from "./DTO/create-ride-DTO";
import { DriverService } from "../driver/driver.service";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const prisma = new PrismaClient();


export class RideService{
    
    constructor(private driverService: DriverService) { }

    async confirmRide(createRideDTO: CreateRideDTO) {
       
        try{
            const { origin, destination, driverId, customerId } = createRideDTO;

            const distanceTime =  await this.driverService.calculateDistanceAndTime(origin, destination);

            const driverWithPrice = await this.driverService.listAllDrivers(distanceTime);

            const selectDriver = driverWithPrice.find(driver => driver.driverId === driverId);

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
    

    async getAllRidesByUser(customerId: number){
        try{
            
            const customerRides = await prisma.ride.findmany({
                where : {
                    customerId : customerId,
                                },
                include : {
                    driver: true
                },
                orderBy:{
                    date: "desc"
                }
            });

            const formattedRides = customerRides.map((ride) => ({ 
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
            console.error("Erro ao buscar corrida de usuários", e.message);
            throw new Error("Não foi possível buscar corrida");
        }
    }

    async getAllRidesByUserAndDriver(customerId: number, driverId: number){
        try{
            
            const customerRides = await prisma.ride.findmany({
                where : {
                    customerId : customerId,
                    driverId : driverId
                },
                include : {
                    driver: true
                },
                orderBy:{
                    date: "desc"
                }
            });

            const formattedRides = customerRides.map((ride: { id: any; date: string | number | Date; origin: any; destination: any; distance: any; duration: any; driver: { id: any; name: any; }; price: any; }) => ({ 
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
            console.error("Erro ao buscar corrida de usuários", e.message);
            throw new Error("Não foi possível buscar corrida");
        }
    }

}