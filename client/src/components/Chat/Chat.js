import React, { useState, useEffect } from 'react';
import querystring from 'query-string';
import io, { connect } from 'socket.io-client';

let socket;

const Chat = ({ location }) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const ENDPOINT = 'localhost:5000';
    useEffect(() => {
        const {name, room} = querystring.parse(location.search);

        socket = io(ENDPOINT);

        setName(name);
        setRoom(room);

        socket.emit('join', { name, room }, () => {
        });
        return () => {
            socket.emit('disconnect');
            socket.off();
        }
    }, [ENDPOINT, location.search])
    return(
        <h1>Chat</h1>
    );
};

export default Chat;