import { PrismaClient } from "@prisma/client";
import { DistanceMatrix } from "../google-api/distanceMatrix";
import { GeocodeServive } from "../google-api/geocode";
import { CorridaDTO } from "./DTO/corridaDTO";


const prisma = new PrismaClient();


export class DriverService {

    constructor(){}

    async listAllDrivers(distanceTime: { distance: number; duration: number; }) { // tentar separar depois o calculo 
        try {
            const drivers = await prisma.driver.findMany();

            const ridePrice = drivers.filter((driver: { minKm: number; }) => distanceTime.distance >= driver.minKm)
            .map((driver: { driver_id: number; name: string; description: string; car: string; rating: string; tax: number; minKm: number; }) => {
                    const price = Math.ceil(driver.tax * distanceTime.distance);
                    const duration = distanceTime.duration;
                    return {
                        driverId: driver.driver_id,
                        driverName: driver.name,
                        driverDesc: driver.description,
                        driverCar: driver.car,
                        driverRating: driver.rating,
                        driverTax: driver.tax,
                        driverMinKm: driver.minKm,
                        price,
                        duration
                    };
                });

            return ridePrice.sort((a: { price: number; } , b: { price: number; }) => a.price - b.price)
        } catch (error){
            console.error("error para calcular as corridas", error.message);
            throw new Error("Não foi possivel calcular a corrida!");
        }
    }
    
    async getDriverById(driverId: number){
        return await prisma.driver.findUnique({
            where: {driver_id: driverId}
        });
    }

}