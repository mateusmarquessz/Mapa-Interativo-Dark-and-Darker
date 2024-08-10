import React, { useState } from 'react';
import './Menu.css';

const mapOptions = [
  { id: 'map1', label: 'Mapa 1' },
  { id: 'map2', label: 'Mapa 2' },
];


const markerOptions = [
  { id: 'shrines', label: 'Shrines' },
  { id: 'extractions', label: 'Extractions / Player Spawns' },
  { id: 'monsters', label: 'Monsters' },
  { id: 'chests', label: 'Chests' },
  { id: 'resources', label: 'Resources' },
  { id: 'miscellaneous', label: 'Miscellaneous' },
  { id: 'loot-spawns', label: 'Loot Spawns' },
  { id: 'modules', label: 'Modules' },
];

const RightMenu = ({ onMapChange, onMarkersChange }) => {
  const [selectedMarkers, setSelectedMarkers] = useState([]);

  const handleMarkerToggle = (markerId) => {
    const newSelectedMarkers = selectedMarkers.includes(markerId)
      ? selectedMarkers.filter(id => id !== markerId)
      : [...selectedMarkers, markerId];

    setSelectedMarkers(newSelectedMarkers);
    onMarkersChange(newSelectedMarkers);
  };

  return (
    <div className="menu right-menu">
      <h3>Map Selection</h3>
      {mapOptions.map((map) => (
        <button
          key={map.id}
          onClick={() => onMapChange(map.id)}
          className="map-button"
        >
          {map.label}
        </button>
      ))}
      <h3>Map Variant</h3>
      <div className="map-variants">
        <button className="map-variant-button">Low Roller</button>
        <button className="map-variant-button">High Roller</button>
      </div>
      <h3>Interactive Markers</h3>
      <div className="interactive-markers">
        {markerOptions.map((marker) => (
          <button
            key={marker.id}
            onClick={() => handleMarkerToggle(marker.id)}
            className={`marker-button ${selectedMarkers.includes(marker.id) ? 'active' : ''}`}
          >
            {marker.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RightMenu;
