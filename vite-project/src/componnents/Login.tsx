import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { useEffect, useState } from "react";
import { fetchLogin } from "../redux/userSlice";
import { areaEnum } from "../types/areaEnum";



export default function Login() {
    const dispatch = useAppDispatch()
    const { user } = useAppSelector((state) => state.user);
    const navigate = useNavigate()
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        const user = await dispatch(fetchLogin({ username, password }))
        if (user.payload.area == areaEnum.Center ||
            user.payload.area == areaEnum.North ||
            user.payload.area == areaEnum.South ||
            user.payload.area == areaEnum.West) {
            navigate('/defence')
        }
        else {
            navigate('/attacks')
        }
    }


    return (
        <div>
            <input
                type="text"
                placeholder="User name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={() => handleLogin()}>
                Login
            </button>
            <q>
                Don't have an account?<p onClick={() => navigate('/register')}>Click here</p>
            </q>
        </div>
    )
}