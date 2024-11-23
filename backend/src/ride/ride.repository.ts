import { PrismaClient } from "@prisma/client";
import { CreateRideDTO } from "./DTO/create-ride-DTO";
import { Client, LatLng } from "@googlemaps/google-maps-services-js";
import { GeocodeServive } from "../google-api/geocode";
import { distancematrix } from "@googlemaps/google-maps-services-js/dist/distance";
import { DistanceMatrix } from "../google-api/distanceMatrix";

const prisma = PrismaClient

const geocode = new GeocodeServive();
const matrix = new DistanceMatrix();


export class RideRepository {

    

    async createRide(createRideDTO: CreateRideDTO) {
        const { origin, destination, customer, driver } = createRideDTO;


        const addressO =  geocode.adressConvert(origin);
        const addressD = geocode.adressConvert(destination);

        const distanceDuration =  matrix.rideDistance(await addressO, await addressD);

        
        
    }
}