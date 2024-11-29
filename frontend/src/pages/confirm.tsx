import { useLocation } from "react-router-dom";
import { StaticMap } from "../component/map";
import { useEffect, useState } from "react";
import axios from "axios";

export const Confirm = () => {
    const location = useLocation();
    const { origin, destination, customer_id } = location.state || {};
    const [drivers, setDrivers] = useState<any[]>([]);
    const [corrida, setCorrida] = useState({
        customer_id: customer_id,
        origin: origin,
        destination: destination,
        driver_id: "",
    });

    const listDrivers = async (origin: string, destination: string) => {
        try {
            console.log(origin, destination, 'dentro do try')
            const response = await axios.post('http://localhost:8080/ride/confirm',
                {
                    origin: origin,
                    destination: destination,
                });
                console.log(response.data);
            setDrivers(response.data);
            console.log("Motoristas disponíveis:", response.data);
        } catch (error) { console.error("Erro ao listar motoristas:", error); }
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
        console.log(origin,destination, 'use effect')
        listDrivers(origin, destination);
    }, [destination, origin]);

    return (
        <>
            <h1>confirm</h1>
            <div>
                <div>
                    <h1>Mapa de Rota</h1>
                    <StaticMap origin={`origin: ${origin}`} destination={`destination: ${destination}`} />
                    <span>Motorista id
                        {drivers.length > 0 ? (
                            drivers.map((driver) => {
                                return (
                                <div key={driver.id}>
                                    <div>{driver.name}</div>
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleDriverId(driver.id);
                                        }}
                                    >
                                        Escolher motorista {driver.name}
                                    </button><span>{driver.description}{driver.car}{driver.rating}{driver.value}</span>
                                </div>)
                            })
                        ) : (
                            <p>Nenhum motorista disponível no momento.</p>
                        )}
                    </span>
                    <button onClick={handleCriarCorrida}>Pedir motorista</button>
                </div>
            </div>
        </>
    );
}