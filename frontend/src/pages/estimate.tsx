import { useState } from "react"
import { CorridaDTO } from "../interfaces/corridaDTO"
import axios from "axios";
import { useNavigate } from "react-router-dom";


export const Estimate = () => {

    const [corridaDto, setCorridaDto] = useState<CorridaDTO>({
        customer_id: 0,
        origin: "",
        destination: ""
    });

    const navigate = useNavigate();

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
        const { name, value } = e.target;
        setCorridaDto({ 
            ...corridaDto, 
            [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/ride/estimate", corridaDto);
            console.log("Resposta do backend:", response.data);
            navigate("/ride/confirm", {state:{corridaDto: response.data}})
        } catch (error) {   
            console.error("Erro ao enviar os dados:", error);
        }
    };

    return (
        <>
            <h1>estimate</h1>
            <div>
                <form onSubmit={handleSubmit}>
                    <label>Id do usuário
                        <input type="number" name="customer_id" id="customer_id" value={corridaDto.customer_id} 
                        onChange={handleFormChange} required></input>
                    </label>
                    <label>Origem
                        <input type="text" name="origin"id="origin" value={corridaDto.origin}
                         onChange={handleFormChange} required></input>
                    </label>

                    <label>Destino
                        <input type="text" name="destination" id="destination" value={corridaDto.destination}
                         onChange={handleFormChange} required></input>
                    </label>

                    <button type="submit" >Confirmar</button>
                </form>
            </div>
        </>
    )
}