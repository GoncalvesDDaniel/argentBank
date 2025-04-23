import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchUserProfile,
    selectIsLoggedIn,
    selectUserProfile,
    selectAuthStatus,
    updateUserProfile,
} from "../../features/auth/authSlice";

function UserProfilePage() {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const userProfile = useSelector(selectUserProfile);
    const status = useSelector(selectAuthStatus);

    const [isEditing, setIsEditing] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    useEffect(() => {
        // Fetch profile if needed
        if (isLoggedIn && !userProfile && status !== "loading") {
            dispatch(fetchUserProfile());
        }

        // If the user is logged in and the profile is available, set the local state from the store
        if (userProfile) {
            setFirstName(userProfile.firstName);
            setLastName(userProfile.lastName);
        }
    }, [dispatch, isLoggedIn, userProfile, status]);

    // Display loading state or error message if userProfile is not available
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
        return (
            <main className="main bg-dark">
                <div className="header">
                    <p>User profile data unavailable.</p>
                </div>
            </main>
        );
    }

    // For input fields, we use local state to manage the values
    const handleEditClick = () => {
        setFirstName(userProfile.firstName);
        setLastName(userProfile.lastName);
        setIsEditing(true);
    };

    // Reset local state to the original values.
    const handleCancelClick = () => {
        setIsEditing(false);
        setFirstName(userProfile.firstName);
        setLastName(userProfile.lastName);
    };

    // Save the updated profile to the store.
    // We use a common pattern in Redux Toolkit (unwrap) to handle async actions.
    const handleSaveClick = async (event) => {
        event.preventDefault();
        try {
            const updatedProfile = await dispatch(
                updateUserProfile({ firstName, lastName })
            ).unwrap();
            setIsEditing(false);
        } catch (error) {
            console.error("Update failed:", error);
        }
    };

    return (
        <main className="main bg-dark">
            <div className="header">
                {!isEditing ? (
                    <h1>
                        Welcome back
                        <br />
                        {`${userProfile.firstName} ${userProfile.lastName}`}!
                    </h1>
                ) : (
                    <h1>Welcome back</h1>
                )}

                {/*Conditionnal wrapper for editing form*/}
                {!isEditing ? (
                    <button className="edit-button" onClick={handleEditClick}>
                        Edit Name
                    </button>
                ) : (
                    <form className="edit-form" onSubmit={handleSaveClick}>
                        <div className="edit-inputs-container">
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

            <h2 className="sr-only">Accounts</h2>
            <section className="account">
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
