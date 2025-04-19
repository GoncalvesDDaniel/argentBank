import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    apiLogin,
    apiFetchUserProfile,
    apiUpdateUserProfile,
} from "../../services/authService";

/** AuthState type definition
 * @typedef {object} AuthState
 * @property {string | null} token - The JWT authentication token
 * @property {object | null} userProfile
 * @property {boolean} isLoggedIn
 * @property {'idle' | 'loading' | 'succeeded' | 'failed'} status
 * @property {string | null} error
 */

/** UserProfileData type definition
 * @typedef {object} UserProfileData
 * @property {string} email
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} createdAt
 * @property {string} updatedAt
 * @property {string} id
 */

/** @type {AuthState} */
const initialState = {
    token: null,
    userProfile: null,
    isLoggedIn: false,
    status: "idle",
    error: null,
};

export const loginUser = createAsyncThunk(
    "auth/login",
    async ({ email, password }, thunkAPI) => {
        try {
            const data = await apiLogin({ email, password });
            return data;
        } catch (error) {
            console.error("Erreur de connexion:", error.message);
            return thunkAPI.rejectWithValue(
                error.message || "Erreur de connexion"
            );
        }
    }
);

export const fetchUserProfile = createAsyncThunk(
    "auth/fetchProfile",
    // Use '_' if first arg isn't needed
    async (_, thunkAPI) => {
        try {
            const state = thunkAPI.getState();
            const token = state.auth.token;

            if (!token) {
                return thunkAPI.rejectWithValue("No token found");
            }

            const userProfileData = await apiFetchUserProfile(token);
            return userProfileData;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    // Synchronous actions
    reducers: {
        logout: (state) => {
            /* ... réinitialise l'état ... */
            state.token = null;
            state.userProfile = null;
            state.isLoggedIn = false;
            state.status = "idle";
            state.error = null;
        },
    },
    // Asynchronous actions
    extraReducers: (builder) => {
        builder
            // Login
            .addCase(loginUser.pending, (state) => {
                console.log("authSlice: loginUser.pending");
                state.status = "loading";
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                console.log(
                    "authSlice: loginUser.fulfilled, payload:",
                    action.payload
                );
                state.status = "succeeded";
                state.token = action.payload.token;
                state.isLoggedIn = true;
                state.error = null;
                // La récupération du profil utilisateur viendra APRÈS ça
            })

            .addCase(loginUser.rejected, (state, action) => {
                console.log(
                    "authSlice: loginUser.rejected, error:",
                    action.payload
                );
                state.status = "failed";
                state.error = action.payload;
                state.isLoggedIn = false;
                state.token = null;
            })

            // Fetch user profile
            .addCase(fetchUserProfile.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.status = "succeeded";
                // action.payload is UserProfileData object
                state.userProfile = action.payload;
                state.error = null;
            })
            .addCase(fetchUserProfile.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || "Failed to fetch profile";
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

// Selectors
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectAuthToken = (state) => state.auth.token;
export const selectAuthStatus = (state) => state.auth.status;
export const selectAuthError = (state) => state.auth.error;
export const selectUserProfile = (state) => state.auth.userProfile;
