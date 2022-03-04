import React, {useEffect, useRef, useState} from 'react';

const Form = () => {

    const [messages, setMessages] = useState([]);
    const [value, setValue] = useState('');
    const socket = useRef();
    const [connected, setConnected] = useState(false);
    const [username, setUsername] = useState('');

    const connect = () => {
        socket.current = new WebSocket('ws://localhost:5000');

        socket.current.onopen = () => {
            setConnected(true);
            console.log('Connection is established')
        }

        socket.current.onmessage = () => {

        }

        socket.current.onclose = () => {
            console.log('Connection was closed');
        }

        socket.current.onerror = () => {
            console.log('An error has occurred');
        }
    }

    // const sendMessage = async () => {
    //     const message = {
    //         username,
    //         message: value,
    //         id: Date.now(),
    //         event: 'message'
    //     }
    //     socket.current.send(JSON.stringify(message));
    //     setValue('')
    // }

    if (!connected) {
        return (
            <div>
                Connection is not established
                <div className="form">
                    <div>
                        <input value={username}
                               onChange={e => setUsername(e.target.value)}
                               type="text"
                               placeholder="Введите имя пользователя"
                        />
                    </div>
                    <div>
                        <button onClick={connect}>Войти</button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            OK
        </div>
    );
};

export default Form;