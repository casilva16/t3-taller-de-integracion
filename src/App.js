import TextField from '@material-ui/core/TextField';
import './styles/App.css';
import io from 'socket.io-client';
import React, { useRef, useEffect, useState } from 'react';
import Chat from './chat';

// const socket = io.connect("wss://tarea-3-websocket.2021-1.tallerdeintegracion.cl", { 
//   path: '/flights'
// });

function App() {
  //<Chat />
  return (
    <Chat />
  )
}

export default App;