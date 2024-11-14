import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { organizasionsEnum } from "../types/organizasionEnum";
import { fetchLogin, fetchRegister } from "../redux/userSlice";
import { areaEnum } from "../types/areaEnum";
import { AsyncThunkAction, ThunkDispatch } from "@reduxjs/toolkit";
import { UnknownAction } from "redux";
import { useAppDispatch } from "../redux/store";

export default function Register() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [organizasion, setorganizasion] = useState<organizasionsEnum>(organizasionsEnum.IDFWest)
    const [area, setarea] = useState<areaEnum>()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()




    return (
        <div className="register">
            <h1>War simulation</h1>
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
            pick organization
            <select
                value={organizasion}
                onChange={(e) => setorganizasion(e.target.value as organizasionsEnum)}
            >
                <option value={organizasionsEnum.IDFCenter}>IDF</option>
                <option value={organizasionsEnum.Hezbollah}>Hezbollah</option>
                <option value={organizasionsEnum.Hamas}>Hamas</option>
                <option value={organizasionsEnum.IRGC}>IRGC</option>
                <option value={organizasionsEnum.Houthis}>Houthis</option>
            </select>

            {organizasion == organizasionsEnum.IDFCenter ||
                organizasion == organizasionsEnum.IDFNorth ||
                organizasion == organizasionsEnum.IDFSouth ||
                organizasion == organizasionsEnum.IDFWest ?
                <p>pick area
                <select value={area}
                    onChange={(e) => setarea(e.target.value as areaEnum)}>
                    <option value={areaEnum.North}>North</option>
                    <option value={areaEnum.South}>South</option>
                    <option value={areaEnum.Center}>Center</option>
                    <option value={areaEnum.West}>West</option>
                </select></p> : <div></div>}
            <button onClick={() => dispatch(fetchRegister({ username, password, organizasion, area }))}>
                Register
            </button>
            <q>
                Already have an account?<p style={{ color: "blue" }} onClick={() => navigate('/')}>Click here</p>
            </q>
        </div>
    )
}

