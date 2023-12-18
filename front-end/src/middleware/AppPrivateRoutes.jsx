import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function PrivateRoute({ children }) {
    const { isLogged } = useAuth();
    console.log("PrivateRoute isLogged:", isLogged);

    if (!isLogged) {
        console.log("Redirecting to /login");
        return <Navigate to="/login" />;
    }

    return children;
}