import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();


export class DriverService {

    constructor() { }

    async listAllDrivers(distanceTime: { distance: number; duration: number; }) { 
        try {
            const drivers = await prisma.driver.findMany();

            console.log("Distância da corrida (em metros):", distanceTime.distance);

     
            const eligibleDrivers = drivers.filter(driver => {
                const minDistanceInMeters = driver.minKm * 1000; 
                return distanceTime.distance >= minDistanceInMeters; 
            });

            console.log("Motoristas elegíveis:", eligibleDrivers);

            const ridePrice = eligibleDrivers.map(driver => {
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
                    duration,
                };
            });

            return ridePrice;
        } catch (error) {
            console.error("error para calcular as corridas", error.message);
            throw new Error("Não foi possivel calcular a corrida!");
        }
    }

    async getDriverById(driverId: number) {
        return await prisma.driver.findUnique({
            where: { driver_id: driverId }
        });
    }

}