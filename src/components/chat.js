import TextField from '@material-ui/core/TextField';
import '../styles/App.css';
import io from 'socket.io-client';
import React, { useEffect, useState } from 'react';


const socket = io.connect("wss://tarea-3-websocket.2021-1.tallerdeintegracion.cl", { 
  path: '/flights'
});

function Chat(){
  const [ state, setState ] = useState({ message: "", name: "" })
  const [ chat, setChat ] = useState([])

  useEffect(() => {
    socket.on('CHAT', ({name, message }) => {
      setChat([...chat, { name, message }])
    })
  })

  const onTextChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const onMessageSubmit = (e) => {
    e.preventDefault()
    const { name, message } = state
    socket.emit("CHAT", { name, message })
    setState({ message: "", name: ""})
  }

  const renderChat = () => {
    return chat.map(({ name, message }, index) => (
      <div key={index}>
        <h3>
          {name}: <span>{message}</span>
        </h3>
      </div>
    ))
  }

  return (
    <div className="card">
      <form onSubmit={onMessageSubmit}>
        <h1>Messenger</h1>
        <div className="name-field">
          <TextField name="name" onChange={(e) => onTextChange(e)} value={state.name} label="Name" />
        </div>
        <div>
          <TextField
            name="message"
            onChange={(e) => onTextChange(e)}
            value={state.message}
            id="outlined-multiline-static"
            variant="outlined"
            label="Message"
          />
        </div>
        <button>Send Message</button>
      </form>
      <div className="render-chat">
        <h1>Centro de Control</h1>
        {renderChat()}
      </div>
    </div>
  )
}

export default Chat;