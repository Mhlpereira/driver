import { Request, Response } from "express";
import { DriverService } from "./driver.service";


export class DriverController{

    async getDrivers(req: Request, res: Response){
        try{
            const drivers = await DriverService.getAllDrivers()
        }
    }
}