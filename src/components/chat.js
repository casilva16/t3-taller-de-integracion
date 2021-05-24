import TextField from '@material-ui/core/TextField';
import '../styles/App.css';
import io from 'socket.io-client';
import React, { useEffect, useState } from 'react';
import Moment from 'moment';

// ACHICAR LA FECHA QUE SALE GIGANTE
const socket = io.connect("wss://tarea-3-websocket.2021-1.tallerdeintegracion.cl", { 
  path: '/flights'
});

function Chat(){
  const [ state, setState ] = useState({ message: "", name: "" })
  const [ chat, setChat ] = useState([])

  useEffect(() => {
    socket.on('CHAT', ({name, message }) => {
      const date = Moment().format('MMMM Do YYYY, h:mm:ss a');
      setChat([...chat, { name, message, date }])
    })
  })

  const onTextChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const onMessageSubmit = (e) => {
    e.preventDefault()
    const { name, message } = state
    const date = Moment().format('MMMM Do YYYY, h:mm:ss a')
    socket.emit("CHAT", { name, message, date })
    setState({ message: "", name: ""})
  }

  const renderChat = () => {
    return chat.map(({ name, message, date }, index) => (
      <div key={index}>
        <h3>
          <p>{date}</p>
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