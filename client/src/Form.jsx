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
            const message = {
                username,
                message: value,
                id: Date.now(),
                event: 'connection'
            };
            socket.current.send(JSON.stringify(message));
        }

        socket.current.onmessage = (event) => {
            const message = JSON.parse(event.data);
            setMessages(prev => [...prev, message]);
        }

        socket.current.onclose = () => {
            console.log('Connection was closed');
        }

        socket.current.onerror = () => {
            console.log('An error has occurred');
        }
    }

    const sendMessage = async () => {
        const message = {
            username,
            message: value,
            id: Date.now(),
            event: 'message'
        }
        socket.current.send(JSON.stringify(message));
        setValue('')
    }

    if (!connected) {
        return (
            <div>
                Войдите для отправки сообщений
                <div className='form'>
                    <div>
                        <input value={username}
                               onChange={e => setUsername(e.target.value)}
                               type='text'
                               placeholder='Введите имя пользователя'
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
            <div className='form'>
                Привет, {username}
                <div>
                    <input value={value}
                           onChange={e => setValue(e.target.value)}
                           type='text'
                           placeholder='Введите сообщение'
                    />
                </div>
                <div>
                    <button onClick={sendMessage}>Отправить</button>
                </div>
                <div className='messages'>
                    {messages.map(msg => <div key={msg.id}>
                        { msg.event === 'connection'
                            ? <div><em>Пользователь <strong>{msg.username}</strong> подключился</em></div>
                            : <div><strong>{msg.username}</strong>: {msg.message}</div>
                        }
                    </div>)}
                </div>
            </div>
        </div>
    );
};

export default Form;