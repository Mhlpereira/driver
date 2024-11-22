import { Customer } from "../customer/customer.entity";
import { Driver } from "../driver/driver.entity";
import { Location } from "../types";

export class RideEntity{

    rideId: string;

    rideDate: Date;

    customer: Customer; // colocar apenas o id

    origin: Location;

    destination: Location;

    distance: number;

    duration: string;

    driver: Driver; // id e nome

    value: number;
}