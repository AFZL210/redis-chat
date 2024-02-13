'use client'
import React, { useCallback } from 'react';
import { io, Socket } from 'socket.io-client';

interface SocketProviderProps {
    children?: React.ReactNode
}

interface ISocketContext {
    sendMessage: (msg: string) => any;
    messages: string[]
}

const SocketContext = React.createContext<ISocketContext | null>(null);

export const useSocket = () => {
    const state = React.useContext(SocketContext);
    if (!state) throw new Error("state is undefined");

    return state;
}


export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {

    const [socket, setSocket] = React.useState<Socket>();
    const [messages, setMessages] = React.useState<string[]>([]);

    React.useEffect(() => {
        const _socket = io("http://localhost:8000");
        setSocket(_socket);

        _socket.on('message', onMessageRecived);

        // disconnect when we re-render this component
        return () => {
            _socket.disconnect();
            _socket.off('message');
            setSocket(undefined);
        }
    }, [])

    const sendMessage: ISocketContext['sendMessage'] = React.useCallback((msg: string) => {
        if(socket) {
            console.log("Send message", msg);
            socket.emit('event:message', { message: msg });
        }
    }, [socket])

    const onMessageRecived = useCallback((msg: string) => {
        console.log("new message ", msg);
        setMessages((prev) => [...prev, msg]);
    }, [])

    return (
        <SocketContext.Provider value={{ sendMessage, messages }}>
            {children}
        </SocketContext.Provider>
    )
}
