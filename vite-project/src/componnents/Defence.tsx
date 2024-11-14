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
    socket.on('relevantMissiles', (data) => {
        console.log(43434)
        setmymissiles(data)
    })
    const shutingDefence = (user_id: string | undefined, bumName: string) => {
        const data = { user_id, bumName }
        socket.emit('shutingDefence', data)
    }
    return (
        <div>
            Your weapon:{mymissiles.map((msl: any) =>
                <div>name:{msl.name} , amount:{msl.amount}
                    <button onClick={() => shutingDefence(user?._id, msl.name)}>Shut</button>
                </div>)}
        </div>
    )
}
