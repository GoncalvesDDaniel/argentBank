import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    selectIsLoggedIn,
    selectUserProfile,
    logout,
} from "../features/auth/authSlice";
import argentBankLogo from "../assets/img/argentBankLogo.png";

function Header() {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const userProfile = useSelector(selectUserProfile);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Fonction de déconnexion connectée à Redux
    const handleLogout = () => {
        dispatch(logout());
        // Optionnel: Nettoyage si token stocké ailleurs (localStorage/sessionStorage)
        navigate("/");
    };

    return (
        <nav className="main-nav">
            <Link className="main-nav-logo" to="/">
                <img
                    className="main-nav-logo-image"
                    src={argentBankLogo}
                    alt="Argent Bank Logo"
                />
                <h1 className="sr-only">Argent Bank</h1>
            </Link>
            <div>
                {isLoggedIn && userProfile ? (
                    <>
                        <Link className="main-nav-item" to="/profile">
                            <i className="fa fa-user-circle"></i>
                            {/* Utilisation du prénom depuis userProfile */}
                            {userProfile.firstName}
                        </Link>
                        <Link
                            className="main-nav-item"
                            to="/"
                            onClick={handleLogout}
                        >
                            <i className="fa fa-sign-out"></i>
                            Sign Out
                        </Link>
                    </>
                ) : (
                    <Link className="main-nav-item" to="/login">
                        <i className="fa fa-user-circle"></i>
                        Sign In
                    </Link>
                )}
            </div>
        </nav>
    );
}

export default Header;
