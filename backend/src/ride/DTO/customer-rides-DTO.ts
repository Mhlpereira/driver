import { IsNotEmpty, IsNumber } from "class-validator"

export class CustomerRidesDTO{

    @IsNotEmpty({message:"O id de usuário não pode estar vazio!"})
    @IsNumber()
    customerIdDTO: number

    driverIdDTO?: number
}