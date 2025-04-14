import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HomePage from "./app/pages/HomePage";
import SignInPage from "./app/pages/SignInPage";
import UserProfilePage from "./app/pages/UserProfilePage";
import Footer from "./components/Footer";
import Header from "./components/Header";

import "./styles/main.css";

function App() {
    return (
        <div className="app-container">
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<SignInPage />} />
                    <Route path="/profile" element={<UserProfilePage />} />
                    {/* route 404 pour plus tard */}
                </Routes>
                <Footer />
            </Router>
        </div>
    );
}

export default App;
