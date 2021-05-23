import React from 'react';
import { Marker } from 'react-leaflet';
import L from 'leaflet';
import plane from '../assets/plane.svg';

const IconLocation = new L.icon({
  iconUrl: plane,
  iconRetinaUrl: plane, 
  iconAnchor: [-0, -0],
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: [40, 40],
});

const Markers = () => {
  return (
    <Marker position={{lat: '51.505', lng: '-0.09'}} icon={IconLocation}/>
  )
}

export default Markers;