import { LatLng } from "@googlemaps/google-maps-services-js";
import axios from "axios";

export class DistanceMatrix {

    async rideDistance(origin: string, destination: string): Promise<{ data: any, distance: number, duration: number }> {
        
        try {
            const response = await axios.get('https://maps.googleapis.com/maps/api/distancematrix/json',
               { params: {
                    origins: origin,
                    destinations: destination,
                    key: process.env.GOOGLE_API_KEY
                }}
            );
           

            const data = response.data;
            if (data.rows.length > 0 &&
                data.rows[0].elements.length > 0 &&
                data.rows[0].elements[0].status === "OK") {
                
                const distanceDuration = data.rows[0].elements[0];
                const distanceKm = distanceDuration.distance.value 
                const durationMin = distanceDuration.duration.value / 60; // Convertendo de segundos para minutos
                
                console.log(distanceDuration,distanceKm,durationMin);
                return {
                    data,
                    distance: distanceKm,
                    duration: durationMin
                };
            } else {
                throw new Error("Erro ao tentar calcular a distância e o tempo!");
            }
        } catch (e) {
            console.error("Erro ao obter distância e tempo:", e.message);
            throw e;
        }
    }
}
