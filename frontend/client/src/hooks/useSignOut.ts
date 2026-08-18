import { useNavigate } from "react-router-dom";
import { authClient } from "@/lib/auth-client.ts";

export function useSignOut() {
    const navigate = useNavigate();

    async function handleSignOut() {
        const { error } = await authClient.signOut();
        if (error) {
            console.error(`Sign out error: ${error.message}`);
        }
        navigate("/login");
    }

    return handleSignOut;
}