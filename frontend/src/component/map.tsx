import React from "react";

interface OriginDestinationProps {
  origin: string;
  destination: string;
}

export const StaticMap: React.FC<OriginDestinationProps> = ({ origin, destination }) => {
  console.log(origin, destination, "mapa");

  const apiKey = process.env.GOOGLE_API_KEY; // Use REACT_APP_ para chaves de ambiente no React.
  const size = "600x400";
  
  // Codifica os endereços para URL.
  const encodedOrigin = encodeURIComponent(origin);
  const encodedDestination = encodeURIComponent(destination);

  // Corrige a formatação da rota.
  const path = `color:0x0000ff|weight:5|${encodedOrigin}|${encodedDestination}`;
  
  // Cria a URL do mapa.
  const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?size=${size}&path=${path}&key=${apiKey}`;

  return (
    <div>
      {apiKey ? (
        <img src={mapUrl} alt="Mapa" />
      ) : (
        <p>Carregando mapa...</p>
      )}
    </div>
  );
};
