const BASE_URL = "http://localhost:3000/api/v1";

async function fetchAPI(endpoint: string, options: RequestInit = {}, auth: boolean, signal?: AbortSignal) {
    const userInfo = localStorage.getItem("userInfo");
    const token = userInfo ? JSON.parse(userInfo).token : null;
    const headers = {
        ...(options.headers || {}),
        "Content-Type": "application/json",
        ...(token && auth ? { Authorization: token } : {}),
    };
    const response = await fetch(BASE_URL + endpoint, {
        ...options,
        headers,
        signal
    });
    const data = await response.json().catch(() => null);
    if (!response.ok) {
        throw new Error(data?.message || response.statusText);
    }
    return data;
}

const API = {
    get: (endpoint: string, auth = false, signal?: AbortSignal) =>
        fetchAPI(endpoint, { method: "GET" }, auth, signal),

    post: (endpoint: string, body: any, auth = false) =>
        fetchAPI(endpoint, { method: "POST", body: JSON.stringify(body) }, auth),
};
export default API