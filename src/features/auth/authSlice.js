import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    apiLogin,
    apiFetchUserProfile,
    apiUpdateUserProfile,
} from "../../services/authService";

// Types definitions for JsDoc
/** AuthState type
 * represents the authentication state in the Redux store.
 * @typedef {object} AuthState
 * @property {string | null} token - The JWT authentication token
 * @property {object | null} userProfile - The user profile after fetching from the API
 * @property {boolean} isLoggedIn - Indicates if the user is authenticated
 * @property {'idle' | 'loading' | 'succeeded' | 'failed'} status - Async status
 * @property {string | null} error - Error message if any
 */

/** UserProfile type
 * represents the user profile data received from the API.
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

/** Initiates the user login process. */
export const loginUser = createAsyncThunk(
    "auth/login",
    async ({ email, password }, thunkAPI) => {
        try {
            const data = await apiLogin({ email, password });
            return data;
        } catch (error) {
            const message = error.message || "Failed to login";
            return thunkAPI.rejectWithValue(message);
        }
    }
);

/** Fetches the profile data with the user token. */
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
            const message = error.message || "Failed to fetch profile";
            return thunkAPI.rejectWithValue(message);
        }
    }
);

/** Updates the user's first and last name. */
export const updateUserProfile = createAsyncThunk(
    "auth/updateProfile",
    async ({ firstName, lastName }, thunkAPI) => {
        try {
            const state = thunkAPI.getState();
            const token = state.auth.token;

            if (!token) {
                return thunkAPI.rejectWithValue("No token found");
            }

            const updatedProfileData = await apiUpdateUserProfile(token, {
                firstName,
                lastName,
            });
            return updatedProfileData;
        } catch (error) {
            const message = error.message || "Failed to update profile";
            return thunkAPI.rejectWithValue(message);
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.token = null;
            state.userProfile = null;
            state.isLoggedIn = false;
            state.status = "idle";
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.token = action.payload.token;
                state.isLoggedIn = true;
                state.error = null;
                // On successful login, fetch the user profile
                // to populate the userProfile state
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
                state.isLoggedIn = false;
                state.token = null;
                state.userProfile = null;
            })

            .addCase(fetchUserProfile.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.userProfile = action.payload;
                state.error = null;
            })
            .addCase(fetchUserProfile.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })

            .addCase(updateUserProfile.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.userProfile = action.payload; // Update the user profile with the new data
                state.error = null;
            })
            .addCase(updateUserProfile.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || "Failed to update profile";
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
