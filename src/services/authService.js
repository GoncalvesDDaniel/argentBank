const API_URL = "http://localhost:3001/api/v1";

export const apiLogin = async ({ email, password }) => {
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
                data?.message || `API Error: ${response.status}`;
            console.error("authService: API login failed:", errorMessage);
            throw new Error(errorMessage);
        }

        return data.body;
    } catch (error) {
        console.error("authService: API login error:", error.message);
        throw error;
    }
};
