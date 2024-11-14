import React, { useEffect, useState } from 'react'
import { socket } from '../main';
import { useAppSelector } from '../redux/store';
import { io } from 'socket.io-client';

export default function Defence() {
    const { user } = useAppSelector((state) => state.user)
    let [mymissiles, setmymissiles] = useState<any[]>([1])
    useEffect(() => {
        const data = user?._id
        socket.emit("iAmConnected", data);
        socket.on('relevantMissiles', (data) => {
            setmymissiles(data)
        })
    }, []);
    return (
        <div>
            Your weapon:{mymissiles.map((msl: any) =>
                <div>name:{msl.name} , amount:{msl.amount}
                </div>)}
        </div>
    )
}
