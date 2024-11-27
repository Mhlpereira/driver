export interface Ride {
    ride_id: number;
    date: string;
    origin: string;
    destination: string;
    distance: number;
    duration: number;
    driver: {
        driver_id: number;
        name: string;
    } | null;
    value: number;
}

export interface CustomerRides {
    customer_id: number;
    rides: Ride[];
}
