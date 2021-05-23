//import '../styles/App.css';
import io from 'socket.io-client';
import React, { useEffect, useState } from 'react';

const socket = io.connect("wss://tarea-3-websocket.2021-1.tallerdeintegracion.cl", { 
  path: '/flights'
});

function InfoFlights(){
  const [ positions, setPositons ] = useState({
    code: "",
    position: []
  })
  const [ flights, setFlights ] = UseState({
    code: "",
    airline: "",
    origin: [],
    destination: [],
    plane: "",
    seats: 0,
    passengers: [{name: "", age: 0}] // aca la edad es integer, ver como definir los int
  })

  useEffect(() => {
    socket.on('POSITION', ({code, position }) => {
      setPositons([...positions, { code, position }])
    })
  })

  useEffect(() => {
    socket.on('FLIGHTS', ({code, airline, origin, destination, plane, seats, passengers }) => {
      setFlights([...flights, { code, airline, origin, destination, plane, seats, passengers }])
    })
  })

  // hay que ver cuando emitir la info
  const sendPositions = (e) => {
    socket.emit("POSITION", {code, position })
  }

  const sendFlights = (e) => {
    socket.emit("FLIGHTS", { code, airline, origin, destination, plane, seats, passengers })
  }

  // hacer una igual para flights??
  const renderFlights = () => {
    return flights.map(({ code, position }, index) => (
      <div key={index}>
        <h3>
          {code}: <span>{position}</span>
        </h3>
      </div>
    ))
  }

  // definir una clase de div para mostrar la info de los vuelos
// REVISAR LO DEL BOTON
  return (
    <div>
{/*       
      <div>
        <form onSubmit={GetInfoFlights}>
          <button>Get Info </button>
        </form>
      </div> */}

      <div>
        <h1>Información de los Vuelos </h1>
        {renderFlights()}
      </div>
    </div>
  )
}

export default InfoFlights;