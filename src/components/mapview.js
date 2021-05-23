import { MapContainer, TileLayer, Marker, Popup,  } from 'react-leaflet'
import React, { useEffect, useState } from 'react';
import '../styles/leaflet.css';
import 'leaflet/dist/leaflet.css';
import io from 'socket.io-client';
import L from 'leaflet';
import plane from '../assets/plane.svg';


const socket = io.connect("wss://tarea-3-websocket.2021-1.tallerdeintegracion.cl", { 
  path: '/flights'
});

const IconLocation = new L.icon({
  iconUrl: plane,
  iconRetinaUrl: plane, 
  iconAnchor: [-0, -0],
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: [40, 40],
});

const MapView = () => {
  const [ flights, setFlight ] = useState([]);
  const [ positions, setPositons ] = useState([]);


  useEffect(() => {
    socket.on('POSITION', data => {
      setPositons((prev) => ([...prev, data]));
      socket.emit('FLIGHTS')

    })
  }, []);

  useEffect(() => {
    socket.on('FLIGHTS', data => {
      setFlight([data])
      socket.emit('FLIGHTS')

    });
  }, []);

// esta no esta funcionando
  const renderInfoFlights = () => {
    return flights.map((obj) => (
      <div>
          <h1>Vuelo {obj.code}</h1>
          <p>Aerolinea {obj.airline} </p>
          <p>Origen {obj.origin} </p>
          <p>Destinon {obj.destination} </p>
          <p>Avion {obj.plane} </p>
          <p>Asientos {obj.seats} </p>
          <p>Pasajeros {obj.passengers} </p>
      </div>
    ))
  }

  const renderPositions = () => {
    return(
      positions.map((pos) => {
        const pos_map = [pos.position[0], pos.position[1]];
        return(
          <Marker position={pos_map} icon={IconLocation}>
            <Popup code={pos.code}>
              <code>{pos.code}</code>
            </Popup>
          </Marker>
        )}
      )
    )
  }

  return (
    <div> 
      <div id='leaflet-container'> 
        <h1>MAP</h1>
        <MapContainer center={[0, 0]} zoom={3} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {renderPositions()}
        </MapContainer>
      </div>
      <div> 
        <h1>Información de Vuelos</h1>
        {renderInfoFlights()}
      </div>
    </div>
  )
}

export default MapView