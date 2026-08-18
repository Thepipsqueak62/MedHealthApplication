import { createAuthClient } from "better-auth/react";
import { adminClient } from "better-auth/client/plugins";
import { ac, admin, doctor, nurse } from "./permissions";

export const authClient = createAuthClient({
    baseURL: 'http://localhost:4000',
    plugins: [
        adminClient({ ac, roles: { admin, doctor, nurse } }),
    ],
})


export interface AppUser {
    id: string;
    email: string;
    name: string;
    role: "admin" | "user" | "doctor" | "nurse";
    phoneNumber?: string | null;
    dateOfBirth?: string | null;
    emailVerified: boolean;
    image?: string | null;
    createdAt: Date;
    updatedAt: Date;
}