import { useEffect } from "react";
import { Home } from "../components/Home";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { check } from "../functions/Reservations";
import { NavBar } from "../components/NavBar";
import { Reservation } from "../components/Reservation";
import { Login } from "../components/Login";
import { Reservations } from "../components/Reservations";

function App() {
    useEffect(() => {
        const interval = setInterval(() => {
            check();
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/reservation" element={<Reservation />} />
                <Route path="/login" element={<Login />} />
                <Route path="/reservations" element={<Reservations />} />
            </Routes>
        </div>
    );
}

export default App;
