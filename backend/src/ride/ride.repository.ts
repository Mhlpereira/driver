import { PrismaClient } from "@prisma/client";
import { CreateRideDTO } from "./DTO/create-ride-DTO";
import { Client, LatLng } from "@googlemaps/google-maps-services-js";
import { GeocodeServive } from "../google-api/geocode";

const prisma = PrismaClient

const geocode = new GeocodeServive();


export class RideRepository {

    

    async createRide(createRideDTO: CreateRideDTO) {
        const { origin, destination, customer, driver } = createRideDTO;


        const addressO =  geocode.adressConvert(origin);
        const addressD =geocode.adressConvert(destination);


        googleMapClient.distancematrix({params:{
            origins: origin,
            destinations: destination
        }})
    }
}