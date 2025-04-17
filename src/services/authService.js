const API_URL = "http://localhost:3001/api/v1";

/**
 * Performs the user login API call.
 * @param {{email: string, password: string}}
 * @returns {Promise<object>}
 * @throws {Error}
 */
export const apiLogin = async ({ email, password }) => {
    try {
        const response = await fetch(`${API_URL}/user/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            // On utilise le message d'erreur de l'API si disponible, sinon un message par défaut
            const errorMessage =
                data?.message || `API Error: ${response.status}`;
            console.error("authService: API login failed:", errorMessage);
            throw new Error(errorMessage);
        }

        const data = await response.json();
        return data.body;
    } catch (error) {
        console.error("authService: API login error:", error.message);
        throw error;
    }
};

/**
 * @typedef {object} UserProfileApiResponse
 * @property {string} email
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} createdAt
 * @property {string} updatedAt
 * @property {string} id
 */

/**
 * Fetches user profile data.
 * @param {string} token
 * @returns {Promise<UserProfileApiResponse>}
 * @throws {Error}
 */
export const apiFetchUserProfile = async (token) => {
    try {
        const response = await fetch(`${API_URL}/user/profile`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const errorMessage =
                data?.message || `API Error: ${response.status}`;
            console.error(
                "authService: Failed to fetch profile:",
                errorMessage
            );
            throw new Error(errorMessage);
        }

        console.log("authService: User profile fetched successfully.");
        const data = await response.json();
        return data.body;
    } catch (error) {
        console.error("authService: API fetch profile error:", error.message);
        throw error;
    }
};

/**
 * Updates the user profile data (first name, last name).
 * @param {string} token - The JWT authentication token.
 * @param {{firstName: string, lastName: string}} updatedData
 * @returns {Promise<object>}
 * @throws {Error}
 */
export const apiUpdateUserProfile = async (token, updatedData) => {
    // TODO: Implement fetch PUT /user/profile later
    console.warn("apiUpdateUserProfile not implemented yet.");
    throw new Error("Profile update not implemented");
};
