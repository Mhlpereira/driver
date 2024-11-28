import { PrismaClient, ride } from "@prisma/client";
import { CreateRideDTO } from "./DTO/create-ride-DTO";
import { DriverService } from "../driver/driver.service";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { GeocodeService } from "../google-api/geocode";
import { DistanceMatrix } from "../google-api/distanceMatrix";
import { CustomerRides } from "../types";

const prisma = new PrismaClient();

const geocode = new GeocodeService();
const matrix = new DistanceMatrix();


export class RideService{
    
    constructor(private driverService: DriverService) { }

    async calculateDistanceAndTime(origin: string, destination: string){
        const distanceTime = matrix.rideDistance(origin, destination);
        return distanceTime;
    }

    async confirmRide(createRideDTO: CreateRideDTO) {
       
        try{
            const { origin, destination, driver_id, customer_id } = createRideDTO;

            console.log('Dados recebidos:', { customer_id, origin, destination });

            const distanceTime =  await this.calculateDistanceAndTime(origin, destination);

            const driverWithPrice = await this.driverService.listAllDrivers(distanceTime);

            const selectDriver = driverWithPrice.find(driver => driver.driverId === driver_id);

            const ride = await prisma.ride.create({
                data:{
                    customer:{
                        connect: {customer_id: customer_id}
                    },
                    origin,
                    destination,
                    distance: distanceTime.distance,
                    duration: distanceTime.duration,
                    value: selectDriver.price,
                    driver: {
                        connect: {driver_id: selectDriver.driverId},
                        
                    },
                   
                    
                },select:{
                    customer:{
                        select:{
                            customer_id: true
                        }
                    },
                    origin: true,
                    destination: true,
                    distance: true,
                    duration: true,
                    driver:{
                        select:{
                            driver_id: true,
                            name: true
                        }
                    },
                    value:true,
                }
            });
            return ride;
        } catch (e) {
            console.error("Erro ao criar a corrida", e);
            throw new Error("Erro ao criar a corrida!");
        }
        
        
    }
    

    // async getAllRidesByUser(customerId: number){
    //     try{
            
    //         const customerRides = await prisma.ride.findMany({
    //             where : {
    //                 customer_id : customerId,
    //                     },
    //                     include: drive
    //         });

    //         const formattedRides = customerRides.map((ride) => ({ 
    //             customer_id: ride.customer_id,
    //             date: format(new Date(ride.date), 'dd/MM/yyyy HH:mm:ss', { locale: ptBR }),
    //             origin: ride.origin,
    //             destination: ride.destination,
    //             distance: ride.distance,
    //             duration: ride.duration,
    //             driver: {
    //                 id: ride.driver.driver_id,
    //                 name: ride.driver.name,
    //             },
    //             value: ride.value,
    //         }));

    //         return {
    //             customer_id: customerId,
    //             rides: formattedRides,
    //         };
    //     } catch(e){
    //         console.error("Erro ao buscar corrida de usuários", e.message);
    //         throw new Error("Não foi possível buscar corrida");
    //     }
    // }

    async getAllRidesByUserAndDriver(customer_id: number, driver_id: number){
        try{
            
            const customerRides = await prisma.ride.findMany({
                where : {
                    customer_id : customer_id,
                    ...(driver_id && {driver_id : driver_id})
                },
                include : {
                    driver: {
                        select:{
                            driver_id: true,
                            name:true
                        }
                    }
                },
                orderBy:{
                    date: "desc"
                }, 
                
            });

            const resultado: CustomerRides = { 
                customer_id: customer_id,
                rides: customerRides.map((rides)=>({
                ride_id: rides.ride_id,
                date: format(new Date(rides.date), 'dd/MM/yyyy HH:mm:ss', { locale: ptBR }),
                origin: rides.origin,
                destination: rides.destination,
                distance: rides.distance,
                duration: rides.duration,
                driver: {
                    driver_id: rides.driver.driver_id,
                    name: rides.driver.name,
                },
                value: rides.value
            }))
            };

            return resultado;
        } catch(e){
            console.error("Erro ao buscar corrida de usuários", e.message);
            throw new Error("Não foi possível buscar corrida");
        }
    }

}