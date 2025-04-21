import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchUserProfile,
    selectIsLoggedIn,
    selectUserProfile,
    selectAuthStatus,
    selectAuthToken,
    updateUserProfile,
} from "../../features/auth/authSlice";

function UserProfilePage() {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const userProfile = useSelector(selectUserProfile);
    const status = useSelector(selectAuthStatus);
    const token = useSelector(selectAuthToken); // Récupérer le token pour l'API

    const [isEditing, setIsEditing] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    useEffect(() => {
        // Fetch profile initial si nécessaire
        if (isLoggedIn && !userProfile && status !== "loading") {
            dispatch(fetchUserProfile());
        }
        // Initialise les champs si le profil est chargé (au cas où le composant re-render)
        // Mais le remplissage principal se fait dans handleEditClick
        if (userProfile) {
            setFirstName(userProfile.firstName);
            setLastName(userProfile.lastName);
        }
    }, [dispatch, isLoggedIn, userProfile, status]);

    // Gestion simple du chargement / erreur / absence de profil
    if (!userProfile) {
        if (status === "loading") {
            return (
                <main className="main bg-dark">
                    <div className="header">
                        <p>Loading profile...</p>
                    </div>
                </main>
            );
        }
        // Pour les autres cas (erreur ou juste pas encore chargé), on affiche un message générique ou rien
        // car userProfile est nécessaire pour la suite.
        return (
            <main className="main bg-dark">
                <div className="header">
                    <p>User profile data unavailable.</p>
                </div>
            </main>
        );
    }

    const handleEditClick = () => {
        // Assure que les champs sont bien remplis avec les dernières données du store
        setFirstName(userProfile.firstName);
        setLastName(userProfile.lastName);
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        // Réinitialiser les champs locaux aux valeurs du store peut être une bonne pratique
        // au cas où le store aurait changé pendant l'édition (improbable mais sûr)
        setFirstName(userProfile.firstName);
        setLastName(userProfile.lastName);
    };

    const handleSaveClick = async (event) => {
        event.preventDefault();
        console.log("Dispatching update with:", { firstName, lastName });
        try {
            const updatedProfile = await dispatch(
                updateUserProfile({ firstName, lastName })
            ).unwrap();
            console.log("Update successful:", updatedProfile);
            setIsEditing(false);
        } catch (error) {
            console.error("Update failed:", error);
        }
    };

    return (
        <main className="main bg-dark">
            <div className="header">
                {/* Le titre change légèrement en mode édition pour correspondre à la maquette */}
                {!isEditing ? (
                    <h1>
                        Welcome back
                        <br />
                        {`${userProfile.firstName} ${userProfile.lastName}`}!
                    </h1>
                ) : (
                    <h1>Welcome back</h1> // Titre simple en mode édition
                )}

                {/* Affichage conditionnel: Bouton 'Edit Name' OU Formulaire */}
                {!isEditing ? (
                    <button className="edit-button" onClick={handleEditClick}>
                        Edit Name
                    </button>
                ) : (
                    <form className="edit-form" onSubmit={handleSaveClick}>
                        <div className="edit-inputs-container">
                            {/* Utilisation de input-wrapper pour le style de base */}
                            <div className="input-wrapper">
                                <label htmlFor="firstName" className="sr-only">
                                    First name
                                </label>
                                <input
                                    type="text"
                                    id="firstName"
                                    value={firstName}
                                    onChange={(e) =>
                                        setFirstName(e.target.value)
                                    }
                                    required
                                />
                            </div>
                            <div className="input-wrapper">
                                <label htmlFor="lastName" className="sr-only">
                                    Last name
                                </label>
                                <input
                                    type="text"
                                    id="lastName"
                                    value={lastName}
                                    onChange={(e) =>
                                        setLastName(e.target.value)
                                    }
                                    required
                                />
                            </div>
                        </div>
                        <div className="edit-buttons-container">
                            <button type="submit" className="edit-button">
                                Save
                            </button>
                            <button
                                type="button"
                                className="edit-button"
                                onClick={handleCancelClick}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                )}
            </div>

            {/* --- Accounts Section --- */}
            <h2 className="sr-only">Accounts</h2>
            <section className="account">
                {/* ... contenu compte x8349 ... */}
                <div className="account-content-wrapper">
                    <h3 className="account-title">
                        Argent Bank Checking (x8349)
                    </h3>
                    <p className="account-amount">$2,082.79</p>
                    <p className="account-amount-description">
                        Available Balance
                    </p>
                </div>
                <div className="account-content-wrapper cta">
                    <button className="transaction-button">
                        View transactions
                    </button>
                </div>
            </section>
            <section className="account">
                {/* ... contenu compte x6712 ... */}
                <div className="account-content-wrapper">
                    <h3 className="account-title">
                        Argent Bank Savings (x6712)
                    </h3>
                    <p className="account-amount">$10,928.42</p>
                    <p className="account-amount-description">
                        Available Balance
                    </p>
                </div>
                <div className="account-content-wrapper cta">
                    <button className="transaction-button">
                        View transactions
                    </button>
                </div>
            </section>
            <section className="account">
                {/* ... contenu compte x8349 (crédit) ... */}
                <div className="account-content-wrapper">
                    <h3 className="account-title">
                        Argent Bank Credit Card (x8349)
                    </h3>
                    <p className="account-amount">$184.30</p>
                    <p className="account-amount-description">
                        Current Balance
                    </p>
                </div>
                <div className="account-content-wrapper cta">
                    <button className="transaction-button">
                        View transactions
                    </button>
                </div>
            </section>
        </main>
    );
}

export default UserProfilePage;
