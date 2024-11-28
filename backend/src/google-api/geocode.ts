import { Client, LatLng } from "@googlemaps/google-maps-services-js";
import axios from "axios";

const googleMapClient = new Client({});

export class GeocodeService {
    async addressConvert(addressNew: string): Promise<LatLng | null> {
        console.log(addressNew);
        try {
            const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
                params: {
                    address: addressNew,  
                    key: process.env.GOOGLE_API_KEY  
                }
            });

            const location = response.data.results[0].geometry.location;
            console.log(location);
            return location;
        } catch (error) {
            console.error('Erro ao buscar coordenadas:', error.message);
            return null;
        }
    }
}