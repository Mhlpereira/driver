import { IsNotEmpty } from "class-validator";
import { NotMatch } from "../../decorator/NotMatch.decorator";

export class CreateRideDTO {

    @IsNotEmpty({ message: "O ID de usuário não pode estar vazio!" })
    customerId: number;

    @IsNotEmpty({ message: "O ID de usuário não pode estar vazio!" })
    origin: string;

    @IsNotEmpty({ message: "O ID de usuário não pode estar vazio!" })
    @NotMatch('origin', { message: "O local de destino não pode ser igual ao local de origem!" })
    destination: string;

    @IsNotEmpty({ message: "O ID de usuário não pode estar vazio!" })
    driverId: number;

}