import './styles/App.css';
import React , {useEffect} from 'react';
import Chat from './components/chat';
import MapView from './components/mapview';
import io from 'socket.io-client';

const socket = io.connect("wss://tarea-3-websocket.2021-1.tallerdeintegracion.cl", { 
  path: '/flights'
});

function App() {

  useEffect(() => {
    socket.emit('FLIGHTS')
    });

  return (
    <div>
      <MapView />
      <Chat />
    </div>
  )
}

export default App;