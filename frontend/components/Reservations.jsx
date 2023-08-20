import { useEffect, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import {
    cancelReservationSpec,
    getReservations,
    startSession,
} from "../functions/Reservations";

export const Reservations = () => {
    const navigate = useNavigate();
    const [data, setData] = useState(undefined);
    const [check, setCheck] = useState(0);

    useEffect(() => {
        if (localStorage.getItem("token") === null) {
            console.log("OK");
            navigate("/login");
        }

        setTimeout(async () => {
            let res = await getReservations();

            setData(res);
        }, 800);
    }, [check]);

    return (
        <div>
            {data !== undefined &&
                data.data.map((item, index) => {
                    return (
                        <div
                            key={index}
                            className="btn btn-dark px-8 py-2 d-block m-2"
                        >
                            {item.code}{" "}
                            <button
                                className="btn btn-success"
                                onClick={() => startSession(item.code)}
                            >
                                Start session
                            </button>{" "}
                            <button
                                className="btn btn-danger"
                                onClick={() => {
                                    cancelReservationSpec(item.code);
                                    setCheck(check + 1);
                                }}
                            >
                                Cancel session
                            </button>
                        </div>
                    );
                })}
        </div>
    );
};
