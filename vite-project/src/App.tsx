import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { socket } from "./main";
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import Register from "./componnents/Register";
import Login from "./componnents/Login";
import Defence from "./componnents/Defence";
import Attack from "./componnents/Attack";

export default function App() {

  const user = useSelector((state: RootState) => state.user);
  

  return (
    <div>
      <Routes>
        {<Route path="login" element={<Login />} />}
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Navigate to={"/login"} />} />
        <Route path="/defence" element={<Defence />} />
        <Route path="/attacks" element={<Attack />} />
      </Routes>
    </div>
  );
}


