import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class DriverService{

    async getAllDrivers(){
        return await prisma.driver.findall();
    }

    async getDriverById(id: number){
        const driver = await prisma.driver.findUnique({
            where: {id}
        });

        if(!driver){
            throw new Error("Motorista não encontrado!")
        }

        return driver;
    }

    
}