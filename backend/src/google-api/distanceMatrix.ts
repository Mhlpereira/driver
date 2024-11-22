import { Client, LatLng } from "@googlemaps/google-maps-services-js";
import { error } from "console";

const googleMapClient = new Client({});


export class DistanceMatrix {

    async rideDistance(origin: LatLng[], destination: LatLng[]): Promise<any> {
        return googleMapClient.distancematrix({
            params: {
                origins: origin,
                destinations: destination,
                key: process.env.GOOGLE_API_KEY
            }
        }).then(r => {
            const data = r.data;
            if(
                data.rows.length > 0 &&
                data.rows[0].elements.length > 0 &&
                data.rows[0].elements[0].status === "OK"
            ) {
                const distanceDuration = data.rows[0].elements[0];
                return {
                    distance: distanceDuration.distance.text,
                    duration: distanceDuration.duration.text
                };
            } else {
                throw new Error("Dados insuficientes ou inválidos retornados pela API.")
            }
        }).catch((e) => {
            console.error("Erro ao obter distância e tempo:", e.message);
            throw error;
        })
    }
}