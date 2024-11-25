import { PrismaClient } from "@prisma/client";
import { DistanceMatrix } from "../google-api/distanceMatrix";
import { GeocodeServive } from "../google-api/geocode";
import { CorridaDTO } from "./DTO/corridaDTO";


const prisma = new PrismaClient();

const geocode = new GeocodeServive();
const matrix = new DistanceMatrix();

export class DriverService {

    
    async calculateDistanceAndTime(origin: string, destination: string){
        const addressO = await geocode.adressConvert(origin);
        const addressD = await geocode.adressConvert(destination);

        const distanceTime = matrix.rideDistance(addressO, addressD);
        return distanceTime;
    }


    async listAllDrivers(distanceTime: { distance: number; duration: number; }) { // tentar separar depois o calculo 
        try {
            const drivers = prisma.driver.findall();

            const ridePrice = drivers.filter((driver: {minKm: number}) => distanceTime.distance >= driver.minKm )
            .map((driver: {  id: string; name: string; description:string; car: string; rating: string; tax:  number; minKm: number}) => {
                const price =  Math.ceil(driver.tax * distanceTime.distance); 
                const duration = distanceTime.duration;
                return {
                    driverId: driver.id,
                    driverName: driver.name,
                    driverDesc: driver.description, 
                    driverCar: driver.car,
                    driverRating: driver.rating,
                    driverTax: driver.tax,
                    driverMinKm: driver.minKm,
                    price,
                    duration
                }
            });

            return ridePrice.sort((a: { price: number; } , b: { price: number; }) => a.price - b.price)
        } catch (error){
            console.error("error para calcular as corridas", error.message);
            throw new Error("Não foi possivel calcular a corrida!");
        }
    }

    async getDriverById(driverId: number){
        return await prisma.driver.findUnique({
            where: {driverId: driverId}
        });
    }

}