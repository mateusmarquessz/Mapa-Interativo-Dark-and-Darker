import React, { useState } from 'react';
import { MapContainer, ImageOverlay, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import MarkerPopup from './MarkerPopup';
import pointsOfInterest from '../data/points';
import LeftMenu from './LeftMenu';
import RightMenu from './RightMenu';
import './MapComponent.css';

const mapOptions = [
  {
    id: 'map1',
    url: 'https://darkanddarkertracker.com/data/maps/Crypt/Normal/Crypt_01/Crypt_01_P.png',
    bounds: [[0, 0], [500, 500]],
    center: [250, 250],
    label: 'Mapa 1'
  },
  {
    id: 'map2',
    url: 'https://darkanddarkertracker.com/data/maps/Inferno/Normal/Inferno_01/Inferno_01_P.png',
    bounds: [[0, 0], [500, 500]],
    center: [250, 250],
    label: 'Mapa 2'
  },
  {
    id: 'map3',
    url: 'https://darkanddarkertracker.com/data/maps/GoblinCave/Normal/GoblinCave_5x5_01/GoblinCave_5x5_01_P.png',
    bounds: [[0, 0], [500, 500]],
    center: [250, 250],
    label: 'Mapa 3'
  },
  {
    id: 'map4',
    url: 'https://darkanddarkertracker.com/data/maps/IceCavern/HighRoller/IceCavern_01/IceCavern_01_P.png',
    bounds: [[0, 0], [500, 500]],
    center: [250, 250],
    label: 'Mapa 4'
  },
  {
    id: 'map5',
    url: 'https://darkanddarkertracker.com/data/maps/IceAbyss/HighRoller/IceAbyss_3x3_01/IceAbyss_3x3_01_P.png',
    bounds: [[0, 0], [500, 500]],
    center: [250, 250],
    label: 'Mapa 5'
  },
  // Adicione mais mapas aqui
];

const MapComponent = () => {
  const [selectedMap, setSelectedMap] = useState(mapOptions[0]);
  const [imageLoaded, setImageLoaded] = useState(true);
  const [selectedMarkers, setSelectedMarkers] = useState([]);

  const handleImageError = () => {
    setImageLoaded(false);
  };

  const handleMapChange = (mapId) => {
    const selected = mapOptions.find(map => map.id === mapId);
    setSelectedMap(selected);
    setImageLoaded(true); // Resetar estado de carregamento
  };

  const handleMarkersChange = (markers) => {
    setSelectedMarkers(markers);
  };

  return (
    <div className="map-container">
      <LeftMenu />
      <div className="map-wrapper">
        <MapContainer
          center={selectedMap.center}
          zoom={1}
          minZoom={-2}
          maxZoom={2}
          style={{ height: '100%', width: '100%' }}
          crs={L.CRS.Simple}
        >
          {imageLoaded ? (
            <ImageOverlay
              url={selectedMap.url}
              bounds={selectedMap.bounds}
            />
          ) : (
            <div style={{ color: 'red', textAlign: 'center', marginTop: '20px' }}>
              Erro ao carregar o mapa. Verifique o caminho da imagem.
            </div>
          )}
          {pointsOfInterest
            .filter(point => selectedMarkers.includes(point.type))
            .map(point => (
              <Marker key={point.id} position={point.position}>
                <MarkerPopup name={point.name} description={point.description} />
              </Marker>
            ))}
          <img
            src={selectedMap.url}
            onError={handleImageError}
            style={{ display: 'none' }}
            alt="Map"
          />
        </MapContainer>
      </div>
      <RightMenu onMapChange={handleMapChange} onMarkersChange={handleMarkersChange} />
    </div>
  );
};

export default MapComponent;
