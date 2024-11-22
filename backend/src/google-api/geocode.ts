import { Client, LatLng } from "@googlemaps/google-maps-services-js";

const googleMapClient = new Client({});

export class GeocodeServive{
async adressConvert(addressNew: string) : Promise<LatLng[]> | null{
    return googleMapClient.geocode({params:{
        address: addressNew,
        key: process.env.GOOGLE_API_KEY,
    }}).then( r => {
        if(r.data.results.length >0 ){
            const location = r.data.results[0].geometry.location;
            return { location}
        } else {
            console.error('Endereço não localizado');
            return null;
        }
    }).catch((error) => {
        console.error('Erro ao buscar coordenadas:', error.message);
        return null;
    })
}


}