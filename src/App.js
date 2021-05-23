import './styles/App.css';
import React from 'react';
import Chat from './components/chat';
import MapView from './components/mapview';

function App() {
  return (
    <div>
      <MapView />
      <Chat />
    </div>
  )
}

export default App;