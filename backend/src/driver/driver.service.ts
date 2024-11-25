import { PrismaClient } from "@prisma/client";
import { DistanceMatrix } from "../google-api/distanceMatrix";
import { GeocodeServive } from "../google-api/geocode";
import { CorridaDTO } from "../ride/DTO/corridaDTO";


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


    async getAllDrivers(distanceTime: { distance: number; duration: number; }) { // tentar separar depois o calculo 
        try {
            const drivers = prisma.driver.findall();

            const ridePrice = drivers.map((driver: { tax: number; id: string; name: string; car: string; rating: string; minKm: number}) => {
                const price =  driver.tax * distanceTime.distance //trocar para ponto flutuando e adicionar math.ceil
                const duration = distanceTime.duration
                return {
                    driverId: driver.id,
                    driverName: driver.name,
                    driverCar: driver.car,
                    driverRating: driver.rating,
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