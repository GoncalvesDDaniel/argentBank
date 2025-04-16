import React from "react";
import { useSelector } from "react-redux";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";

import HomePage from "./app/pages/HomePage";
import SignInPage from "./app/pages/SignInPage";
import UserProfilePage from "./app/pages/UserProfilePage";
import Footer from "./components/Footer";
import Header from "./components/Header";

import { selectIsLoggedIn } from "./features/auth/authSlice";

import "./styles/main.css";

function App() {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    return (
        <div className="app-container">
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<SignInPage />} />
                    <Route
                        path="/profile"
                        element={
                            isLoggedIn ? (
                                <UserProfilePage />
                            ) : (
                                <Navigate to="/login" replace />
                            )
                        }
                    />
                    {/* route 404 ? */}
                </Routes>
                <Footer />
            </Router>
        </div>
    );
}

export default App;
