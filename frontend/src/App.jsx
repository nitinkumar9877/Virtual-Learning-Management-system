// frontend/src/App.jsx

import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx"; // Assuming Home.jsx is fine
import Login from "./pages/Login.jsx"; // Note the capital L
import SignUp from "./pages/signUp.jsx"; // Note the capital S
import { ToastContainer } from "react-toastify";


export const serverUrl = "http://localhost:5000";


function App() {
    return (
        <>
            <ToastContainer />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
            </Routes>
        </>
    );
}

export default App;