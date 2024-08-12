import React, { useState } from 'react';
import './RightMenu.css';

const mapOptions = [
  { id: 'map1', label: 'Crypt', className: 'Crypt' },
  { id: 'map2', label: 'Inferno', className: 'Inferno' },
  { id: 'map3', label: 'Globin Cave', className: 'GlobinCave' },
  { id: 'map4', label: 'Ice Cavern', className: 'IceCavern' },
  { id: 'map5', label: 'Ice Abyss', className: 'IceAbyss' },
];

const mapVariants = [
  { id: 'mapvariant1', label: 'Crypt Variant 1', parentId: 'map1', className:'optionButton' },
  { id: 'mapvariant2', label: 'Crypt Variant 2', parentId: 'map1', className:'optionButton' },
  { id: 'mapvariant3', label: 'Inferno Variant 1', parentId: 'map2', className:'optionButton' },
  { id: 'mapvariant4', label: 'Inferno Variant 2', parentId: 'map2', className:'optionButton' }
];

const markerOptions = [
  { id: 'shrines', label: 'Shrines' },
  { id: 'extractions', label: 'Extractions / Player Spawns' },
  { id: 'monsters', label: 'Monsters' },
  { id: 'chests', label: 'Chests' },
  { id: 'resources', label: 'Resources' },
  { id: 'miscellaneous', label: 'Miscel laneous' },
  { id: 'loot-spawns', label: 'Loot Spawns' },
  { id: 'modules', label: 'Modules' },
];

const RightMenu = ({ onMapChange, onMarkersChange }) => {
  const [selectedMap, setSelectedMap] = useState(null);
  const [selectedMarkers, setSelectedMarkers] = useState([]);
  const [expandedMarker, setExpandedMarker] = useState(null);
  const [selectedMapVariant, setSelectedMapVariant] = useState('');

  const handleMapClick = (mapId) => {
    setSelectedMap(mapId);
    onMapChange(mapId);
    setSelectedMapVariant('');
  };

  const handleMapVariantChange = (event) => {
    const variantId = event.target.value;
    setSelectedMapVariant(variantId);
    onMapChange(variantId);
  };

  const handleMarkerToggle = (markerId) => {
    const newSelectedMarkers = selectedMarkers.includes(markerId)
      ? selectedMarkers.filter(id => id !== markerId)
      : [...selectedMarkers, markerId];

    setSelectedMarkers(newSelectedMarkers);
    onMarkersChange(newSelectedMarkers);
  };

  const handleExpandToggle = (id) => {
    setExpandedMarker(expandedMarker === id ? null : id);
  };

  const handleSelectAllMarkers = () => {
    const allMarkerIds = markerOptions.map(marker => marker.id);
    setSelectedMarkers(allMarkerIds);
    onMarkersChange(allMarkerIds);
  };

  const handleDeselectAllMarkers = () => {
    setSelectedMarkers([]);
    onMarkersChange([]);
  };

  const availableVariants = mapVariants.filter(variant => variant.parentId === selectedMap);

  return (
    <div className="menu right-menu">
      <h3>Map Selection</h3>
      <div className='mapchoices'>
        {mapOptions.map((map) => (
          <button
            key={map.id}
            onClick={() => handleMapClick(map.id)}
            className={`${map.className} ${selectedMap === map.id ? 'selected' : ''}`}
          >
            {map.label}
          </button>
        ))}
      </div>
      {availableVariants.length > 0 && (
        <>
          <h3>Map Variant</h3>
          <div className="map-variants">
            <select 
              className="selectButton"
              name="mapVariantSelect" 
              value={selectedMapVariant} 
              onChange={handleMapVariantChange}
            >
              {availableVariants.map((variant) => (
                <option key={variant.id} value={variant.id} className={variant.className} >
                  {variant.label}
                </option>
              ))}
            </select>
          </div>
        </>
      )}
      <h3>Dungeon Mode</h3>
      <div className="Dungeon-variants">
        <button className="Dungeon-variant-button">Low Roller</button>
        <button className="Dungeon-variant-button">High Roller</button>
      </div>
      <h3>Interactive Markers</h3>
      <div className="InteractiveMarkers">
      <div className="marker-buttons">
        <button 
          className="select-all-button"
          onClick={handleSelectAllMarkers}
        >
          Select All Markers
        </button>
        <button 
          className="deselect-all-button"
          onClick={handleDeselectAllMarkers}
        >
          Deselect All Markers
        </button>
      </div>
      {markerOptions.map((marker) => (
        <div key={marker.id} className="ant-collapse-item">
          <div className="ant-collapse-header" aria-expanded={expandedMarker === marker.id} onClick={() => handleExpandToggle(marker.id)} role="button" tabIndex="0">
            <div className="ant-collapse-expand-icon">
              <span role="img" aria-label="right" className={`anticon anticon-${expandedMarker === marker.id ? 'down' : 'right'} ant-collapse-arrow`}>
                <svg viewBox="64 64 896 896" focusable="false" data-icon={expandedMarker === marker.id ? 'down' : 'right'} width="1em" height="1em" fill="#ddd" aria-hidden="true">
                  <path d={expandedMarker === marker.id ? 'M764.7 485.7L314.9 136.9c-3.9-3-6.1-7.7-6.1-12.6V47c0-6.7 7.7-10.4 12.9-6.3l450.8 352.1a31.96 31.96 0 010 50.4L327.8 748.8c-5.2 4.1-12.9 0.4-12.9-6.3v-68.7c0-4.9 2.3-9.6 6.1-12.6L764.7 485.7z' : 'M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z'} />
                </svg>
              </span>
            </div>
            <span className="ant-collapse-header-text">{marker.label}</span>
            <div className="ant-collapse-extra">
              <button 
                type="button" 
                className="ant-btn"
                onClick={() => handleMarkerToggle(marker.id)}
              >
                <span>{selectedMarkers.includes(marker.id) ? 'Deselect All' : 'Select All'}</span>
              </button>
            </div>
          </div>
          <div className={`ant-collapse-content ${expandedMarker === marker.id ? 'ant-collapse-content-active' : 'ant-collapse-content-inactive'}`}>
            <div className="ant-collapse-content-box">
              <div className="infor">
                <label>
                  <span>{marker.label}</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default RightMenu;
