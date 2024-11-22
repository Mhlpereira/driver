import { LatLng } from "@googlemaps/google-maps-services-js";
import { DriverEntity } from "../../driver/driver.entity";
import { CustomerEntity } from "../../customer/customer.entity";

export class CreateRideDTO{
    origin: string;
    destination: string;
    driver: DriverEntity;
    customer: CustomerEntity;
}