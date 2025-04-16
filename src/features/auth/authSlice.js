import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiLogin } from "../../services/authService";

const initialState = {
    token: null,
    user: null,
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

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            /* ... réinitialise l'état ... */
            state.token = null;
            state.user = null;
            state.isLoggedIn = false;
            state.status = "idle";
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
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
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

// Selectors (inchangés)
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectAuthToken = (state) => state.auth.token;
export const selectAuthStatus = (state) => state.auth.status;
export const selectAuthError = (state) => state.auth.error;
