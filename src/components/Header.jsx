import React from "react";
import { Link } from "react-router-dom";
import argentBankLogo from "../assets/img/argentBankLogo.png";

function Header() {
    // --- Valeurs temporaires pour tester les deux états ---

    const isLoggedIn = false;
    const firstName = "Tony"; // Prénom d'exemple si connecté

    // Fonction placeholder pour le logout (sera connectée à Redux plus tard)
    const handleLogout = () => {
        console.log("Déconnexion cliquée ! (Logique Redux à venir)");
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
                {isLoggedIn ? (
                    // 2. Si l'utilisateur EST connecté :
                    <>
                        <Link className="main-nav-item" to="/profile">
                            <i className="fa fa-user-circle"></i>
                            {firstName}
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
                    // 6. Si l'utilisateur N'EST PAS connecté :
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
