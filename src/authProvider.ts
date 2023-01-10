import { AuthProvider } from "@pankod/refine-core";
import nookies from "nookies";

export const authProvider: AuthProvider = {
    login: async ({ email, password }) => {
        const stored = nookies.get()["auth-mock-user"];

        if (
            email &&
            JSON.parse(stored ?? "{").email === email &&
            JSON.parse(stored ?? "{").password === password
        ) {
            nookies.set(null, "auth", JSON.stringify({ email }), {
                maxAge: 30 * 24 * 60 * 60,
                path: "/",
            });
            return Promise.resolve();
        }

        return Promise.reject();
    },
    register: (params) => {
        if (params.email && params.password) {
            nookies.set(
                null,
                "auth-mock-user",
                JSON.stringify({
                    email: params.email,
                    password: params.password,
                }),
                {
                    maxAge: 30 * 24 * 60 * 60,
                    path: "/",
                },
            );
            return Promise.resolve();
        }
        return Promise.reject();
    },
    logout: () => {
        nookies.destroy(null, "auth");
        return Promise.resolve();
    },
    checkError: (error) => {
        if (error && error.statusCode === 401) {
            return Promise.reject();
        }

        return Promise.resolve();
    },
    checkAuth: (ctx) => {
        const cookies = nookies.get(ctx);
        return cookies["auth"] ? Promise.resolve() : Promise.reject();
    },
    getPermissions: () => Promise.resolve(["admin"]),
    getUserIdentity: () =>
        Promise.resolve({
            id: 1,
            name: "Jane Doe",
            avatar: "https://unsplash.com/photos/IWLOvomUmWU/download?force=true&w=640",
        }),
};
