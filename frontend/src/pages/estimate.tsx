import { useState } from "react"
import { CorridaDTO } from "../interfaces/corridaDTO"
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";


export const Estimate = () => {

    const [corridaDto, setCorridaDto] = useState<CorridaDTO>({
        customer_id: 0,
        origin: "",
        destination: ""
    });

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
        const { name, value } = e.target;
        setCorridaDto({ 
            ...corridaDto, 
            [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/ride", corridaDto);
            console.log("Resposta do backend:", response.data);
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
                        <input type="text" name="origin" id="origin" value={corridaDto.destination}
                         onChange={handleFormChange} required></input>
                    </label>

                    <button>Confirmar</button>
                    <button>Limpar</button>
                </form>
            </div>
        </>
    )
}