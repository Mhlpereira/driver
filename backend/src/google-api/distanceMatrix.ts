import { Client, LatLng } from "@googlemaps/google-maps-services-js";

const googleMapClient = new Client({});


export class DistanceMatrix {

    async rideDistance(origin: LatLng[], destination: LatLng[]): Promise<{ data: any, distance: number, duration: number }> {
        return googleMapClient.distancematrix({
            params: {
                origins: origin,
                destinations: destination,
                key: process.env.GOOGLE_API_KEY
            }
        }).then(r => {
            const data = r.data;
            if (data.rows.length > 0 &&
                data.rows[0].elements.length > 0 &&
                data.rows[0].elements[0].status === "OK") {
                const distanceDuration = data.rows[0].elements[0];
                const distanceKm = distanceDuration.distance.value/1000
                const durationMin = distanceDuration.duration.value/60
                return {
                    data,
                    distance: distanceKm,
                    duration: durationMin
                };
            } else {
                throw new Error("Erro ao tentar converted a latitude e longitude!");
            }
        }).catch((e) => {
            console.error("Erro ao obter distância e tempo:", e.message);
            throw e;
        });
    }
}