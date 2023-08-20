import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../functions/Authentication";

export const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email, password);
        navigate("/reservations");
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="btn btn-primary">
                    Login
                </button>
            </form>
        </div>
    );
};
