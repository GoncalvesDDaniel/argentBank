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
 * @returns {Promise<UserProfileApiResponse>} The updated user profile data from the API.
 * @throws {Error} If the API call fails or returns an error status.
 */
export const apiUpdateUserProfile = async (token, updatedData) => {
    if (!token) {
        console.error("authService: No token provided for profile update.");
        throw new Error("Authentication token is missing.");
    }
    if (!updatedData || !updatedData.firstName || !updatedData.lastName) {
        console.error(
            "authService: Invalid data provided for profile update:",
            updatedData
        );
        throw new Error("First name and last name are required.");
    }

    try {
        const response = await fetch(`${API_URL}/user/profile`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                firstName: updatedData.firstName,
                lastName: updatedData.lastName,
            }),
        });

        const data = await response.json(); // Attempt to parse JSON regardless of status

        if (!response.ok) {
            // Use API error message if available, otherwise default HTTP status message
            const errorMessage =
                data?.message ||
                `API Error: ${response.status} ${response.statusText}`;
            console.error(
                "authService: API profile update failed:",
                errorMessage
            );
            throw new Error(errorMessage);
        }

        console.log("authService: User profile updated successfully.");
        // Assuming the structure { status, message, body } and body contains the profile
        return data.body;
    } catch (error) {
        // Handle network errors or errors thrown from the !response.ok block
        console.error("authService: API profile update error:", error.message);
        // Re-throw the error so it can be caught by the caller (e.g., async thunk)
        throw error;
    }
};
