import { IsNotEmpty, IsNumber, IsOptional } from "class-validator"

export class CustomerRidesDTO{

    @IsNotEmpty({message:"O id de usuário não pode estar vazio!"})
    @IsNumber()
    customerId: number;

    @IsOptional()
    driverId?: number;
}