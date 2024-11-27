import axios from "axios"
import {  useState } from "react"

export const ListingTrip = async () => {


    const [customerId, setCustomerId] = useState("");
    const [driverId, setDriverId] = useState("");
    const [lista, setLista] = useState<any[]>([]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            let url = `http://localhost:8080/ride/${customerId}`;
            if (driverId) {
                url += `?driver_id${driverId}`
            }

            const response = await axios.get(url);
            console.log("Lista recebida:", response.data);
            setLista(response.data)
        } catch (error) {
            console.error("Erro ao buscar a lista:", error);
        }
    };






    return (
        <>
            <h1>trip</h1>
            <form onSubmit={handleSubmit}>
                <label>Id do usuário
                    <input type="number" value={customerId} onChange={(e) => setCustomerId(e.target.value) } required/></label>
                <label>Id do Motorista<input type="number" value={driverId} onChange={(e) => setDriverId(e.target.value)}/></label>
                <button type="submit">Procurar</button>
            </form>
                <ul>
                    {lista.map(ride => (
                        <li key={ride.id}>{ride}</li>
                    ))}
                </ul>
        </>
    )
}
