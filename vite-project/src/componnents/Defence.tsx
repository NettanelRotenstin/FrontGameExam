import React, { useEffect, useState } from 'react'
import { socket } from '../main';
import { useAppSelector } from '../redux/store';
import { io } from 'socket.io-client';
import { areaEnum } from '../types/areaEnum';

export default function Defence() {
    const { user } = useAppSelector((state) => state.user)
    let [mymissiles, setmymissiles] = useState<any[]>([1])
    const [history, sethistory] = useState<any[]>([])
    useEffect(() => {
        const data = { user_id: user?._id, area: user?.area }
        socket.emit("iAmConnectedDefence", data);
    }, []);

    socket.on('relevantMissiles', async (data) => {
        await setmymissiles(data)
    })
    socket.on("historyDefence", async (data) => {
        await sethistory(data)
    })
    const shutingDefence = (user_id: string | undefined, bumName: string, area?: areaEnum | undefined) => {
        const data = { user_id, bumName, area }
        socket.emit('shutingDefence', data)
        socket.emit("iAmConnectedDefence", { user_id, area: user?.area });
    }
    return (
        <div>
            Your weapon:{mymissiles.map((msl: any) =>
                <div>name:{msl.name} , amount:{msl.amount}
                    {msl.amount > 0 ? <button onClick={() => shutingDefence(user?._id, msl.name, user?.area)}>Shut</button> : <div></div>}
                </div>)}

            Your history:{history.map((h: any) =>
                <div>
                    bum name:{h.missile} , success:{h.success}
                </div>)}

        </div>

    )
}
