import React, {useEffect, useState} from 'react'
import io from 'socket.io-client';

const socket = io.connect("http://localhost:3001");


export default function Socket() {

    const [msg, setMsg] = useState("");
    const [messageRecieved, setMessageRecieved] = useState("");

    const sendMessege = ()=>{
        socket.emit("send_message", msg);
    }

    useEffect(()=>{
        socket.on("receive_message", (data)=>{
            setMsg(data);
        })
    }, [socket])

    return (
        <div>
            <input type="text" placeholder='Messege..' onChange={(e)=>setMsg(e.target.value)}/>
            <button onClick={sendMessege}> Send Message</button>
            <h1>{msg}</h1>
        </div>
    )
}
