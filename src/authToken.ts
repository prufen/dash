// Singleton for storing GitHub access token in the browser local storage.

export function getToken() {
    return localStorage.getItem("authToken") ?? "";
}

export function setToken(token: string) {
    localStorage.setItem("authToken", token);
}

export function clearToken() {
    localStorage.removeItem("authToken");
}
