import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { cancelReservation } from "../functions/Reservations";

export const Reservation = () => {
    const [time, setTime] = useState(Date.now());

    useEffect(() => {
        const interval = setInterval(() => setTime(Date.now()), 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);
    return (
        <div>
            {localStorage.getItem("code") !== null && (
                <div>
                    <div>Code: {localStorage.getItem("code")}</div>
                    <div>
                        Aproximate time: {localStorage.getItem("aproxTime")}
                    </div>
                    <button
                        className="btn btn-danger"
                        onClick={() => cancelReservation()}
                    >
                        Cancel reservation
                    </button>
                </div>
            )}
            {localStorage.getItem("code") === null && (
                <div>
                    <h2>
                        Make reservation <Link to={"/"}>here</Link>
                    </h2>
                </div>
            )}
        </div>
    );
};
