import type { AuthProvider } from "react-admin";

// Placeholder until real auth is added: everyone is signed in as "Admin" and logout stays on the page.
export const authProvider: AuthProvider = {
    login: () => Promise.resolve(),
    logout: () => Promise.resolve(false),
    checkAuth: () => Promise.resolve(),
    checkError: () => Promise.resolve(),
    getIdentity: () => Promise.resolve({ id: "admin", fullName: "Admin" }),
};
