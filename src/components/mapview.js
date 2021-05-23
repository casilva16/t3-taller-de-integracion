import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import '../styles/leaflet.css';
import 'leaflet/dist/leaflet.css';
import Markers from './marker';

const MapView = () => {
  return (
    <div id='leaflet-container'> 
      <h1>MAP</h1>
      <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Markers /> 
      </MapContainer>
    </div>
  )
}

export default MapView