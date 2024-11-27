import React from "react";

interface originDestinationProps { 
    origin: string; 
    destination: string;
}
export const StaticMap : React.FC<originDestinationProps> = ({origin, destination}) => {


    const apiKey = process.env.GOOGLE_API_KEY; 
    const size = '600x400'; 
    const path = `color:0x0000ff|weight:5|${origin}|${destination}`; 
    const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?size=${size}&path=${path}&key=${apiKey}`

    return (
        <div>
            {mapUrl ? (
                <img src={mapUrl} alt="Mapa" />
            ) : (
                <p>Carregando mapa...</p>
            )}
        </div>
    );
};


