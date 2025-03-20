// src/lib/utils/api.js

const BASE_URL = "http://127.0.0.1:8000";

/**
 * Makes an API request with common logic for all methods.
 * @param {string} endpoint - API endpoint (without base URL).
 * @param {string} method - HTTP method (GET, POST, PUT, DELETE).
 * @param {object} [payload] - Optional request body for POST/PUT.
 * @returns {Promise<{ data?: any, error?: string, status: number | null }>}
 */
const makeRequest = async (endpoint, method, payload = null) => {
  let token = null;

  // Check if window is defined (client-side) before accessing localStorage
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token"); // Retrieve token for authentication
  }

  // Build request options
  const requestOptions = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }), // Add auth header only if token exists
    },
    body: payload ? JSON.stringify(payload) : null,
  };

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, requestOptions);
    console.log("USING ENDPOINT: ", endpoint);

    // Check if response content is JSON before parsing
    const contentType = response.headers.get("content-type");
    const isJson = contentType && contentType.includes("application/json");

    // Parse response data (JSON or text)
    const responseData = isJson ? await response.json() : await response.text();

    if (!response.ok) {
      return { error: extractErrorMessage(responseData, response.status), status: response.status };
    }

    return { data: responseData?.responseObject || responseData, status: response.status };
  } catch (error) {
    console.error("Network error:", error);
    return { error: "Network error. Please try again.", status: null };
  }
};

/**
 * Extracts a user-friendly error message from API response.
 * @param {any} responseData - Parsed response data.
 * @param {number} status - HTTP status code.
 * @returns {string} - Formatted error message.
 */
const extractErrorMessage = (responseData, status) => {
  if (!responseData) return `Request failed with status ${status}`;

  if (typeof responseData === "string") return responseData;

  if (responseData.responseObject?.errors) {
    try {
      const errorsArray = JSON.parse(responseData.responseObject.errors);
      return Array.isArray(errorsArray) ? errorsArray.join("\n") : responseData.responseObject.errors;
    } catch {
      return responseData.responseObject.errors;
    }
  }

  return responseData.statusMessage || `Request failed with status ${status}`;
};

// API Helper Functions
export const getRequest = async (endpoint) => makeRequest(endpoint, "GET");
export const postRequest = async (endpoint, payload) => makeRequest(endpoint, "POST", payload);
export const putRequest = async (endpoint, payload) => makeRequest(endpoint, "PUT", payload);
export const deleteRequest = async (endpoint) => makeRequest(endpoint, "DELETE");