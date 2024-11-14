import React, { useEffect, useState } from 'react'
import { socket } from '../main';
import { useAppSelector } from '../redux/store';
import { io } from 'socket.io-client';

export default function Attack() {
    const { user } = useAppSelector((state) => state.user)
    let [mymissiles, setmymissiles] = useState<any[]>([1])
    const [historyAttack, sethistoryAttack] = useState<any[]>([])
    useEffect(() => {
        const data = user?._id
        socket.emit("iAmConnected", data);
    }, []);

    socket.on('relevantMissiles', async(data) => {
        await setmymissiles(data)
    })
    socket.on("historyAttack",async(data)=>{
        await sethistoryAttack(data)
    })
    const shutingDefence = (user_id: string | undefined, bumName: string) => {
        const data = { user_id, bumName }
        socket.emit('shutingAttack', data)
        socket.emit("iAmConnected", user_id);
    }
    return (
        <div>
            Your weapon:{mymissiles.map((msl: any) =>
                <div>name:{msl.name} , amount:{msl.amount}
                    {msl.amount > 0 ? <button onClick={() => shutingDefence(user?._id, msl.name)}>Shut</button> : <div></div>}
                </div>)}
                <table>{history.map(h => <td>bum name:{h.missile} success:{h.success} </td>)}</table>
        </div>
        
    )
}
