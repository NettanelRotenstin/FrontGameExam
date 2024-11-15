import React, { useEffect, useState } from 'react'
import { socket } from '../main';
import { useAppSelector } from '../redux/store';
import { io } from 'socket.io-client';
import { areaEnum } from '../types/areaEnum';

export default function Attack() {
    const { user } = useAppSelector((state) => state.user)
    const [areaAttack, setareaAttack] = useState<areaEnum>()
    const [mymissiles, setmymissiles] = useState<any[]>([1])
    const [historyAttack, sethistoryAttack] = useState<any[]>()
    useEffect(() => {
        console.log(user?._id)
        const d = user?._id
        socket.emit("iAmConnectedAttack", d);
    }, []);

    socket.on('relevantMissiles', async (data) => {
        await setmymissiles(data)
    })

    socket.on("historyAttack", async (data) => {
        await sethistoryAttack(data)
    })
    const shutingAttack = (user_id: string | undefined, bumName: string, area?: areaEnum) => {
        const data = { user_id, bumName, area }
        socket.emit('shutingAttack', data)
        socket.emit("iAmConnected", user_id);
    }
    return (
        <div>
            Your weapon:{mymissiles.map((msl: any) =>
                <div>name:{msl.name} , amount:{msl.amount}
                    <select value={areaAttack}
                        onChange={(e) => setareaAttack(e.target.value as areaEnum)}>

                        <option value={areaEnum.Center}>Center</option>
                        <option value={areaEnum.South}>South</option>
                        <option value={areaEnum.North}>North</option>
                        <option value={areaEnum.West}>West</option>
                    </select>
                    {msl.amount > 0 ? <button onClick={() => shutingAttack(user?._id, msl.name, areaAttack)}>Shut</button> : <div></div>}
                </div>)}

                Your history:{historyAttack?.map((h: any) =>
                <div>
                    bum name:{h.missile} , success:true
                </div>)}

        </div>

    )
}
