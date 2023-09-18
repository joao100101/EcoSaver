import React from "react";
import Login from "../pages/auth/login";
import Register from "../pages/auth/Register"
import Edit from "../pages/crud/Edit"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import Home from "../pages/Home";
import Create from "../pages/crud/Create";
import ListAll from "../pages/crud/ListAll";



const Routering = () => {
    return (

        <Router>
            <Routes>
                <Route path="*" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/home" element={
                    <ProtectedRoutes>
                        <Home />
                    </ProtectedRoutes>
                } />
                <Route path="/create" element={
                    <ProtectedRoutes>
                        <Create />
                    </ProtectedRoutes>
                } />
                <Route path="/edit/:id" element={
                    <ProtectedRoutes>
                        <Edit />
                    </ProtectedRoutes>
                } />
                <Route path="/list" element={
                    <ProtectedRoutes>
                        <ListAll />
                    </ProtectedRoutes>
                } />
            </Routes>
        </Router>
    );
}

export default Routering;