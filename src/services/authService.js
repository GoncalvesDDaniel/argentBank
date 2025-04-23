//Type definitions for JsDoc

/** UserProfileApiResponse type
 * Represents the user profile data received from the API.
 * @typedef {object} UserProfileApiResponse
 * @property {string} email
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} createdAt
 * @property {string} updatedAt
 * @property {string} id
 */

const API_URL = "http://localhost:3001/api/v1";

/**Performs the user login API call.
 * @param {{email: string, password: string}}
 * @returns {Promise<{token: string}>}
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

        const data = await response.json();

        if (!response.ok) {
            const errorMessage =
                data?.message || `API Error: ${response.status}`;
            console.error("authService: API login failed:", errorMessage);
            throw new Error(errorMessage);
        }

        return data.body;
    } catch (error) {
        throw error;
    }
};

/** Fetches user profile data.
 * @param {string} token
 * @returns {Promise<UserProfileApiResponse>}
 * @throws {Error}
 */
export const apiFetchUserProfile = async (token) => {
    if (!token) {
        throw new Error("Authentication token is missing.");
    }
    try {
        const response = await fetch(`${API_URL}/user/profile`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();

        if (!response.ok) {
            const errorMessage =
                data?.message || `API Error: ${response.status}`;
            throw new Error(errorMessage);
        }

        return data.body;
    } catch (error) {
        throw error;
    }
};

/**Updates the user profile data
 * @param {string} token - The JWT authentication token.
 * @param {{firstName: string, lastName: string}} updatedData
 * @returns {Promise<UserProfileApiResponse>} The updated user profile data
 * @throws {Error}
 */
export const apiUpdateUserProfile = async (token, updatedData) => {
    if (!token) {
        throw new Error("Authentication token is missing.");
    }
    if (!updatedData || !updatedData.firstName || !updatedData.lastName) {
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

        const data = await response.json();

        if (!response.ok) {
            const errorMessage =
                data?.message ||
                `API Error: ${response.status} ${response.statusText}`;
            throw new Error(errorMessage);
        }

        return data.body;
    } catch (error) {
        throw error;
    }
};
