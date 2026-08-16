import { betterAuth } from "better-auth";
import Database from "better-sqlite3";
import { admin as adminPlugin } from "better-auth/plugins"; // ← the plugin, aliased
import { ac, doctor, nurse, admin } from "./permissions";     // ← your custom "admin" role

export const auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_URL || "http://localhost:4000",
    trustedOrigins: ["http://localhost:5173"],
    database: new Database("../sqlite.db"),
    emailAndPassword: { enabled: true },
    plugins: [
        adminPlugin({ ac, roles: { admin, doctor, nurse } }),
    ],
});