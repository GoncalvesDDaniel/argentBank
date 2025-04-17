import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchUserProfile,
    selectIsLoggedIn,
    selectUserProfile,
    selectAuthStatus,
    // selectAuthError
} from "../../features/auth/authSlice";

function UserProfilePage() {
    const dispatch = useDispatch();

    const isLoggedIn = useSelector(selectIsLoggedIn);
    const userProfile = useSelector(selectUserProfile);
    const status = useSelector(selectAuthStatus);
    // const error = useSelector(selectAuthError); // For later error handling

    useEffect(() => {
        if (isLoggedIn && !userProfile) {
            dispatch(fetchUserProfile());
        }
    }, [dispatch, isLoggedIn, userProfile]);

    if (status === "loading") {
        return (
            <main className="main bg-dark">
                <div className="header">
                    <p>Loading profile...</p>
                </div>
            </main>
        );
    }

    if (status === "failed") {
        return (
            <main className="main bg-dark">
                <div className="header">
                    <p>Error loading profile: {error}</p>
                </div>
            </main>
        );
    }

    return (
        <main className="main bg-dark">
            <div className="header">
                {/* Check if userProfile exists before accessing its properties */}
                <h1>
                    Welcome back
                    <br />
                    {userProfile
                        ? `${userProfile.firstName} ${userProfile.lastName}`
                        : ""}
                    !
                </h1>
                {/* Edit Name Button will go here */}
                <button className="edit-button">Edit Name</button>
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
