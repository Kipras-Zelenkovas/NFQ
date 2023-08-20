import { useEffect, useState } from "react";
import { getUpcoming, reserve } from "../functions/Reservations";

export const Home = () => {
    const [data, setData] = useState(undefined);

    useEffect(() => {
        const interval = setInterval(async () => {
            let res = await getUpcoming();
            setData(res);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            {data !== undefined ? (
                <div className="card" style={{ width: 18 + "rem" }}>
                    <div className="card-header">Codes</div>
                    <ul className="list-group list-group-flush">
                        {data.data.map((item, index) => {
                            return (
                                <li
                                    className={
                                        item.status === "started"
                                            ? "list-group-item bg-success d-inline-block"
                                            : "list-group-item"
                                    }
                                    key={index}
                                >
                                    <p>{item.code}</p>
                                    {item.status === "started" ? (
                                        <p className="float-end">STARTED</p>
                                    ) : null}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            ) : null}

            <button onClick={() => reserve()} className="mt-4 btn btn-primary">
                Make reservation
            </button>
        </div>
    );
};
