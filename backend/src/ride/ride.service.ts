import { PrismaClient } from "@prisma/client";
import { CustomerEntity } from "../customer/customer.entity";
import { DriverEntity } from "../driver/driver.entity";
import { DistanceMatrix } from "../google-api/distanceMatrix";
import { GeocodeServive } from "../google-api/geocode";
import { CreateRideDTO } from "./DTO/create-ride-DTO";
import { RideEntity } from "./ride.entity";
import {Client} from "@googlemaps/google-maps-services-js";




export class RideService{
    

    async createRide(createRideDTO: CreateRideDTO) {
       

        
        
    }
    

}