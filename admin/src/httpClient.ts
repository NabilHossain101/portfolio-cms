import { fetchUtils } from "react-admin";

export const apiUrl = import.meta.env.VITE_API_URL ?? "http://localhost:5122";

// Shared by every resource's data provider. Maps the API's problem-details `errors` to root.serverError,
// which makes react-admin show the validation messages in its error notification.
export const httpClient = (path: string, options?: fetchUtils.Options) =>
    fetchUtils.fetchJson(`${apiUrl}${path}`, options).catch((error) => {
        if (error.body?.errors)
            error.body.errors = { root: { serverError: Object.values(error.body.errors).flat().join(" ") } };
        throw error;
    });
