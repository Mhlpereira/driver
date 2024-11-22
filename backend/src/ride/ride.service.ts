import { CustomerEntity } from "../customer/customer.entity";
import { DriverEntity } from "../driver/driver.entity";
import { CreateRideDTO } from "./DTO/create-ride-DTO";
import { RideEntity } from "./ride.entity";
import {Client} from "@googlemaps/google-maps-services-js";

export class RideService{
    private rideEntity: RideEntity;
    private driverEntity: DriverEntity[];
    private customerEntity: CustomerEntity;
    

    async geolocationGM(createRideDTO: CreateRideDTO){
        const geoClient = new Client({});

        geoClient.geocode({
            params:{
                address: origin
            }
        })
    }
    


    async createRide(){

    }
}