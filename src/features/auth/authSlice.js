import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    token: null,
    user: null,
    isLoggedIn: false,
    status: "idle",
    error: null,
};

const API_URL = "http://localhost:3001/api/v1";

export const loginUser = createAsyncThunk(
    "auth/login",
    async ({ email, password }, thunkAPI) => {
        // console.log(`Tentative de connexion pour ${email}`);
        try {
            const response = await fetch(`${API_URL}/user/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                // On utilise le message d'erreur de l'API si disponible, sinon un message par défaut
                const errorMessage =
                    data.message || `Erreur ${response.status}`;
                console.error("Échec de la connexion API:", errorMessage);
                return thunkAPI.rejectWithValue(errorMessage);
            }

            console.log("Connexion API réussie, données reçues:", data);
        } catch (error) {
            console.error(
                "Erreur réseau ou autre durant le login:",
                error.message
            );
            return thunkAPI.rejectWithValue(
                error.message || "Impossible de joindre le serveur"
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
                state.status = "loading";
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.token = action.payload.token;
                state.isLoggedIn = true;
                state.error = null;
                // La récupération du profil utilisateur viendra APRÈS ça
            })
            .addCase(loginUser.rejected, (state, action) => {
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
