// src/lib/utils/api.js
import { user } from '$lib/stores/authStore';
import { get } from 'svelte/store';

const BASE_URL = "http://127.0.0.1:8000";

/**
 * Makes an API request with common logic for all methods.
 * @param {string} endpoint - API endpoint (without base URL).
 * @param {string} method - HTTP method (GET, POST, PUT, DELETE, PATCH).
 * @param {object} [payload] - Optional request body for POST/PUT/PATCH.
 * @param {string} [customToken] - Optional custom token to override stored token.
 * @returns {Promise<{ data?: any, error?: string, status: number | null }>}
 */
const makeRequest = async (endpoint, method, payload = null, customToken = null) => {
  // let token = customToken;
  let token = localStorage.getItem("token");
  console.log("Token:", token);
  
  // If no custom token provided, try to get from localStorage or authStore
  if (!token) {
    // Check if window is defined (client-side) before accessing localStorage
    if (typeof window !== "undefined") {
      // First try to get from authStore
      const currentUser = get(user);
      if (currentUser && currentUser.access) {
        token = currentUser.access;
      } else {
        // Fall back to previous token storage method
        token = localStorage.getItem("token");
      }
    }
  }
  
  // Build request options
  const requestOptions = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `JWT ${token}` }), // Add auth header only if token exists
    },
    body: payload ? JSON.stringify(payload) : null,
  };
  
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, requestOptions);
    console.log("USING ENDPOINT: ", endpoint);
    
    // Check if response content is JSON before parsing
    const contentType = response.headers.get("content-type");
    const isJson = contentType && contentType.includes("application/json");
    
    // For 204 No Content responses, don't try to parse body
    if (response.status === 204) {
      return { data: null, status: response.status };
    }
    
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
  
  // Handle different error response formats
  if (responseData.responseObject?.errors) {
    try {
      const errorsArray = JSON.parse(responseData.responseObject.errors);
      return Array.isArray(errorsArray) ? errorsArray.join("\n") : responseData.responseObject.errors;
    } catch {
      return responseData.responseObject.errors;
    }
  }
  
  // Handle DRF and Djoser error formats
  if (responseData.detail) {
    return responseData.detail;
  }
  
  if (responseData.non_field_errors) {
    return Array.isArray(responseData.non_field_errors) 
      ? responseData.non_field_errors.join("\n") 
      : responseData.non_field_errors;
  }
  
  // If there are field-specific errors, format them
  if (typeof responseData === 'object' && !Array.isArray(responseData)) {
    const fieldErrors = Object.entries(responseData)
      .filter(([key]) => key !== 'statusMessage' && key !== 'status')
      .map(([field, errors]) => {
        const errorMsg = Array.isArray(errors) ? errors.join(', ') : errors;
        return `${field}: ${errorMsg}`;
      });
    
    if (fieldErrors.length > 0) {
      return fieldErrors.join('\n');
    }
  }
  
  return responseData.statusMessage || `Request failed with status ${status}`;
};

// API Helper Functions
export const getRequest = async (endpoint, customToken = null) => 
  makeRequest(endpoint, "GET", null, customToken);

export const postRequest = async (endpoint, payload, customToken = null) => 
  makeRequest(endpoint, "POST", payload, customToken);

export const putRequest = async (endpoint, payload, customToken = null) => 
  makeRequest(endpoint, "PUT", payload, customToken);

export const patchRequest = async (endpoint, payload, customToken = null) => 
  makeRequest(endpoint, "PATCH", payload, customToken);

export const deleteRequest = async (endpoint, customToken = null) => 
  makeRequest(endpoint, "DELETE", null, customToken);