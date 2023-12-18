import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import style from "../css/AppHeader.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function AppHeader() {
    const { isLogged, logout } = useAuth();

    const handleLogout = () => {
        logout();
    };
    return (
        <div className={`container-fluid d-flex ${style.my_header_container}`}>
            <div className="container mx-auto d-flex align-items-center justify-content-between">
                <div className={`d-flex align-items-center ${style.logo_and_title}`}>
                    <FontAwesomeIcon className={style.header_icon} icon="fa-solid fa-camera-retro" />

                    <h1 className="text-white">
                        SimSal PHOTO ALBUM
                    </h1>
                </div>
                <div className={`d-flex justify-content-between `}>
                    <ul className={`d-flex justify-content-between ${style.header_menu}`}>
                        <NavLink to="/" className="text-decoration-none">
                            <li className="mx-3 text-white">Home</li>
                        </NavLink>
                        <NavLink to="/album" className="text-decoration-none">
                            <li className="mx-3 text-white">
                                Album
                            </li>
                        </NavLink>

                        <li className="mx-3 text-white">
                            Contact
                        </li>

                        <NavLink to="/dashboard" className="text-decoration-none">
                            <li className={`mx-3 text-white ${isLogged ? '' : 'd-none'}`}>
                                Dashboard
                            </li>
                        </NavLink>

                        {isLogged ? (
                            <li
                                className="mx-3 text-white"
                                onClick={handleLogout}
                            >
                                Logout
                            </li>
                        ) : (
                            <NavLink to="/login">
                                <li className="mx-3 text-white">
                                    Login
                                </li>
                            </NavLink>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}