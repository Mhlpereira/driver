import { IsNotEmpty, IsNumber } from "class-validator";
import { NotMatch } from "../../decorator/NotMatch.decorator";

export class CorridaDTO {


    @IsNotEmpty({message: "O ID de usuário não pode estar vazio!"})
    @IsNumber()
    customerId: number;


    @IsNotEmpty({message: "A origem não pode estar vazio!"})
    origin: string;

    @IsNotEmpty({message: "O destino não pode estar vazio!"})
    @NotMatch('origin', {message: "O local de destino não pode ser igual ao local de origem!"} )
    destination: string;
}