import React from 'react';
import { Popup } from 'react-leaflet';

const MarkerPopup = ({ name, description }) => (
  <Popup>
    <h3>{name}</h3>
    <p>{description}</p>
  </Popup>
);

export default MarkerPopup;
