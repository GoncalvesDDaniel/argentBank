import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    loginUser,
    selectIsLoggedIn,
    selectAuthError,
    selectAuthStatus,
} from "../features/auth/authSlice";

function SignInForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const authError = useSelector(selectAuthError);
    const authStatus = useSelector(selectAuthStatus);

    // gestion du formulaire
    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(loginUser({ email, password }));
    };

    useEffect(() => {
        if (isLoggedIn) {
            console.log("Login réussi, navigation vers /profile...");
            navigate("/profile");
        }
    }, [isLoggedIn, navigate]);

    return (
        <section className="sign-in-content">
            <i className="fa fa-user-circle sign-in-icon"></i>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <div className="input-wrapper">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        aria-required="true"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="input-wrapper">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        aria-required="true"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="input-remember">
                    <input
                        type="checkbox"
                        id="remember-me"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(!rememberMe)}
                    />
                    <label htmlFor="remember-me">Remember me</label>
                </div>
                {authStatus === "failed" && authError && (
                    <div className="error-message">{authError}</div>
                )}
                <button type="submit" className="sign-in-button">
                    Sign In
                </button>
            </form>
        </section>
    );
}

export default SignInForm;
