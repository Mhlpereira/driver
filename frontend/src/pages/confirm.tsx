import { useLocation } from "react-router-dom";
import { StaticMap } from "../component/map";
import { useEffect, useState } from "react";
import axios from "axios";

export const Confirm = async () => {

    const location = useLocation();
    const { origin, destination, customer_id } = location.state || {};
    const [drivers, setDrivers] = useState<any[]>([]);


    const [corrida, setCorrida] = useState({
        customer_id: customer_id,
        origin: origin,
        destination: destination,
        driver_id: "",
    });

    const listDrivers = async () => {
        try {
            const response = await axios.get("http://localhost:8080/rides/listDrivers");
            setDrivers(response.data);
            console.log("Motoristas disponíveis:", response.data);
        } catch (error) {
            console.error("Erro ao listar motoristas:", error);
        }
    };

    const handleDriverId = (driver_id: string) => {
        setCorrida({ ...corrida, driver_id });
    };

    const handleCriarCorrida = async () => {
        try {
            const response = await axios.patch("http://localhost:8080/rides", corrida);
            console.log("Corrida criada/atualizada:", response.data);
        } catch (error) {
            console.error("Erro ao criar/atualizar corrida:", error);
        }
    };

    useEffect(() => {
        listDrivers();
    }, []);

    return (
        <>
            <h1>confirm</h1>
            <div>
                <div>
                    <h1>Mapa de Rota</h1>
                    <StaticMap origin={`origin: ${origin}`} destination={`destination: ${destination}`} />
                    <form>
                        <span>Motorista id
                            <ul>
                                {drivers.map((driver)=> (
                                    <li key={driver.id}>
                                        <button onClick={() => handleDriverId(driver.id)}></button>
                                    </li>
                                ))}
                            </ul>
                        </span>
                    </form>

                    <button onClick={handleCriarCorrida}>Pedir motorista</button>
                </div>
            </div>
        </>
    )
}