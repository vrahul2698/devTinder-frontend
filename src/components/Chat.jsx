import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { createSocketConnection } from '../utils/socket';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';

const Chat = () => {
    const { targetUserId } = useParams();
    // console.log(targetUserId, 'TargetUserId')
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("")
    const user = useSelector(store => store.user)
    const userId = user?._id;

    const fetchChatMessages = async () => {
        try {
            const messages = await axios.get(BASE_URL + "/chat/" + targetUserId, { withCredentials: true });
            console.log(messages.data?.messages)

            const chatMessage = messages?.data?.messages?.map(msg => {
                return {
                    firstName: msg?.senderId?.firstName,
                    lastName: msg?.senderId?.lastName,
                    text: msg?.text,
                    time: new Date(msg?.createdAt).toLocaleString()
                }
            })

            setMessages(chatMessage)
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => { fetchChatMessages(); }, [])

    useEffect(() => {
        if (!userId) {
            return;
        }
        const socket = createSocketConnection();
        // As Soon as the page loaded , the socket connection is made(it will emit an event =>  joinChat)
        socket.emit("joinChat", { firstName: user?.firstName, lastName: user?.lastName, userId, targetUserId });

        socket.on("messageRecieved", ({ firstName, lastName, text }) => {
            console.log(firstName + " " + text)
            setMessages((messages) => [...messages, { firstName, lastName, text }])
        })

        return () => {
            socket.disconnect();
        }
    }, [userId, targetUserId])


    const sendMessage = () => {
        const socket = createSocketConnection();
        socket.emit("sendMessage", { firstName: user?.firstName, lastName: user?.lastName, userId, targetUserId, text: newMessage });
        setNewMessage("");
    }
    return (
        <div className='w-3/4 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col'>
            <h1 className='p-5 border-b border-gray-600'>Chat</h1>

            <div className='flex-1 overflow-scroll p-5'>
                {/* Display Messages*/}
                {messages?.map((msg, index) => {
                    return (
                        <div className={"chat " + (user.firstName === msg.firstName ? "chat-end" : "chat-start")} key={index}>
                            <div className="chat-header">
                                {msg.firstName + " " + msg?.lastName}
                                <time className="text-xs opacity-50">{msg.time}</time>
                            </div>
                            <div className="chat-bubble">{msg.text}</div>
                            <div className="chat-footer opacity-50">Seen</div>
                        </div>
                    )
                })}
            </div>

            <div className='p-5 border-t border-gray-600 flex items-center gap-2'>
                <input
                    className='flex-1 border border-gray-500 text-white rounded p-2'
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}></input>
                <button className='btn btn-secondary' onClick={() => sendMessage()}>Send</button>
            </div>
        </div>
    )
}

export default Chat