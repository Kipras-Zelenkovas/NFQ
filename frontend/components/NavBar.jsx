import { Link, useNavigate } from "react-router-dom";
import { logout } from "../functions/Authentication";

export const NavBar = () => {
    const navigate = useNavigate();
    return (
        <div
            style={{ height: 3 + "rem", width: 100 + "%" }}
            className="text-bg-dark mb-3 d-flex"
        >
            <div>
                <Link
                    to={"/"}
                    style={{ textDecoration: "none" }}
                    className="p-4 m-2 text-light align-middle"
                >
                    Main
                </Link>
                <Link
                    to={"/reservation"}
                    style={{ textDecoration: "none" }}
                    className="p-4 m-2 text-light align-middle"
                >
                    My reservation
                </Link>
            </div>
            <div>
                {localStorage.getItem("token") === null && (
                    <Link
                        to={"/login"}
                        style={{ textDecoration: "none" }}
                        className="p-4 m-2 text-light align-middle"
                    >
                        Login
                    </Link>
                )}
                {localStorage.getItem("token") !== null && (
                    <button
                        className="btn p-4 m-2 text-light align-middle"
                        onClick={() => {
                            logout();
                            navigate("/");
                        }}
                    >
                        Logout
                    </button>
                )}
                {localStorage.getItem("token") !== null && (
                    <Link
                        to={"/reservations"}
                        style={{ textDecoration: "none" }}
                        className="p-4 m-2 text-light align-middle"
                    >
                        Reservations
                    </Link>
                )}
            </div>
        </div>
    );
};
