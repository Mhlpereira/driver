import { useLocation } from "react-router-dom";
import { StaticMap } from "../component/map";
import { useEffect, useState } from "react";
import axios from "axios";


interface Driver {
    driver_id: number;
    name: string;
    description: string;
    car: string;
    rating: string;
    tax: number;
    minKm: number;
}


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
            console.log(response.data.data, "dentro do list")
            const listaDriver = response.data.data.map((d: { driverId: any; driverName: any; driverDesc: any; driverCar: any; driverRating: any; price: any; }) =>
           { return{
                driver_id: d.driverId,
                name: d.driverName,
                description: d.driverDesc,
                car: d.driverCar,
                rating: d.driverRating,
                price: d.price

            }} );
            console.log(listaDriver, "apos o map")
            setDrivers(listaDriver);
            console.log(setDrivers, "set drivers")
            console.log(drivers, "drivers")
            return listaDriver;
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
        console.log(origin, destination, 'use effect')
        listDrivers(origin, destination);
    }, [destination, origin]);

    return (
        <>
            <h1>confirm</h1>
            <div>
                <div>
                    <h1>Mapa de Rota</h1>
                    <StaticMap origin={`origin: ${origin}`} destination={`destination: ${destination}`} />
                    <span>Motorista id</span>
                    <ul>
                       {listDrivers.map(driver =>
                            <li key={driver.driver_id}>{driver}</li>
                            )}
                        
                    </ul>
                    <button onClick={handleCriarCorrida}>Pedir motorista</button>
                </div>
            </div>
        </>
    );
}