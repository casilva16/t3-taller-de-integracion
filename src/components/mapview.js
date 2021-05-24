import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import React, { useEffect, useState } from 'react';
import '../styles/leaflet.css';
import 'leaflet/dist/leaflet.css';
import io from 'socket.io-client';
import L from 'leaflet';
import plane from '../assets/plane.svg';
import dot from '../assets/black-circle.svg';
import house from '../assets/house.svg';

const socket = io.connect("wss://tarea-3-websocket.2021-1.tallerdeintegracion.cl", { 
  path: '/flights'
});

const IconDot = new L.icon({
  iconUrl: dot,
  iconRetinaUrl: dot, 
  iconAnchor: [-0, -0],
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: [5, 5],
});

const IconHouse = new L.icon({
  iconUrl: house,
  iconRetinaUrl: house, 
  iconAnchor: [-0, -0],
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: [25, 25],
});

const IconLocation = new L.icon({
  iconUrl: plane,
  iconRetinaUrl: plane, 
  iconAnchor: [-0, -0],
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: [30, 30],
});

const blueOptions = { color: 'blue' };

const MapView = () => {
  const [ plane, setPlane ]  = useState({});
  const [ flights, setFlight ] = useState([]);
  const [ positions, setPositons ] = useState([]);


  useEffect(() => {
    socket.on('POSITION', data => {
      setPositons((prev) => ([...prev, data]));
      setPlane((prev) => ({...prev, [data.code]: data.position }));
    })
  }, []);

  useEffect(() => {
    socket.emit('FLIGHTS')
    socket.on('FLIGHTS', data => {
      setFlight(data)
    })
  }, []);
  
  const renderInfoFlights = () => {
    return flights.map((obj) => (
      <div>
          <h3>Vuelo: {obj.code}</h3>
          <p>Aerolinea: {obj.airline} </p>
          <p>Origen: {obj.origin[0]}, {obj.origin[1]}</p>
          <p>Destino: {obj.destination[0]}, {obj.destination[1]}</p>
          <p>Avion: {obj.plane} </p>
          <p>Asientos: {obj.seats} </p>
          <p> Passengers</p>
          {show_passengers(obj.passengers)}
      </div>
    ))
  }
  
  const show_passengers = (passengers) => {
    return passengers.map((pas) => {
      return(
        <p>{pas.name}, {pas.age} </p>
      )
    })
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

  const renderPlane = () => {
    return Object.keys(plane).map((item) => {
      //const pos_map = [plane[item].position[0], plane[item].position[1]]
      return (
        <div> 
        <p> Este es el item {plane[item].code}</p>
        </div>
      //   <Marker position={pos_map} icon={IconLocation}>
      //   <Popup code={plane[item].code}>
      //     <code>{plane[item].code}</code>
      //   </Popup>
      // </Marker>
      )
    })  
  }

  const renderHouse = () => {
    {flights.map((flight) => {
      const pos_origin = [flight.origin[0], flight.origin[1]]
      const pos_des = [flight.destination[0], flights.destination[1]]
      const multiPolyline = [pos_origin, pos_des]
      return (
        <div>
        <Marker>position={pos_origin} icon={IconHouse}</Marker>
        <Marker>position={pos_des} icon={IconHouse}</Marker>
        <Polyline pathOptions={blueOptions} positions={multiPolyline} />
        </div>
        )
    })}
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
            {renderPlane()}
        </MapContainer>
      </div>
      <div> 
        <h1>Información de Vuelos</h1>
        <button>Get flights </button>
        {renderInfoFlights()}
      </div>
    </div>
  )
}

export default MapView