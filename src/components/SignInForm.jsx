import React, { useState } from "react"; // <-- 1. Importer useState

function SignInForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    // gestion du formulaire
    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Tentative de connexion avec :");
        console.log("Email:", email);
        console.log("Password:", password);
        console.log("Remember Me:", rememberMe);

        // appel à l'API et Redux ---

        // try {
        //   const userData = await loginUser(email, password);
        //   dispatch(loginSuccess(userData)); // Action Redux

        //   if (rememberMe) {
        // Gérer la persistance (ex: localStorage)
        //   }
        // Naviguer vers la page profil

        // } catch (error) {
        // Afficher un message d'erreur
        // dispatch(loginFailure(error)); // Action Redux
        // }
    };

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
                <button type="submit" className="sign-in-button">
                    Sign In
                </button>
            </form>
        </section>
    );
}

export default SignInForm;
