import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import style from "../css/AppLogin.module.css"

export default function AppLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { login, isLogged } = useAuth();
    console.log("Auth context:", useAuth());
    const navigate = useNavigate();

    useEffect(() => {
        if (isLogged) {
            navigate("/dashboard");
        }
    }, [isLogged, navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError(null);

        try {
            const loginSuccess = await login(email, password);
            console.log("Login success:", loginSuccess);
            if (loginSuccess) {
            }
        } catch (error) {
            throw new Error(error);
            console.log("Dettagli dell'errore:", Error);

            if (error.response && error.response.status === 404) {
                setError("Credenziali non valide. Riprova.");
            } else {
                setError(
                    "Si è verificato un errore durante il login. Riprova più tardi."
                );
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`container-fluid ${style.form_container}`}>

            <div className={`${style.form_login}`}>
                <form onSubmit={handleLogin}>
                    <h3 className="text-center">Effettua il login</h3>

                    <div >
                        <label htmlFor="email">
                            Email
                        </label>
                        <input
                            className="mx-2"
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="password">
                            Password
                        </label>
                        <input
                            className="mx-2"
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className={style.button_container}>
                        <button className={style.button_login} type="submit" disabled={loading}>
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </div>

                </form>
            </div>

        </div >
    );
}