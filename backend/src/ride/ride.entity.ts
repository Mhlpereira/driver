import { Customer } from "../customer/customer.entity";
import { Driver } from "../driver/driver.entity";

export class Ride{

    rideId: string;

    rideDate: Date;

    customer: Customer; // colocar apenas o id

    destination: string;

    distance: number;

    duration: string;

    driver: Driver; // id e nome

    value: number;
}