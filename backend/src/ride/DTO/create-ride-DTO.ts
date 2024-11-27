import { IsNotEmpty } from "class-validator";
import { NotMatch } from "../../decorator/NotMatch.decorator";

export class CreateRideDTO {


    @IsNotEmpty({ message: "O ID de usuário não pode estar vazio!" })
    customer_id: number;

    @IsNotEmpty({ message: "O ID de usuário não pode estar vazio!" })
    origin: string;

    @IsNotEmpty({ message: "O ID de usuário não pode estar vazio!" })
    @NotMatch('origin', { message: "O local de destino não pode ser igual ao local de origem!" })
    destination: string;

    driver_id?: number;

    constructor(customer_id: number, origin: string, destination: string, driver_id?: number){
        this.customer_id = customer_id,
        this.origin = origin,
        this.destination = destination,
        this.driver_id = driver_id
    }

}