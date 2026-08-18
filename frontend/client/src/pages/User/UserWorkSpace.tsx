import { Button } from "@/components/ui/button.tsx";
import { authClient } from "@/lib/auth-client.ts";
import { useNavigate } from "react-router-dom";

const UserWorkSpace = () => {
    const { data: session } = authClient.useSession();
    const navigate = useNavigate();

    async function handleSignOut() {
        const { error } = await authClient.signOut();
        if (error) {
            console.error(`Sign out error: ${error.message}`);
        }
        navigate("/login");
    }

    return (
        <div>
            {session?.user && (
                <div>
                    <div>
                        THIS IS Your UserWorkSpace
                        Welcome {session.user.name} to your workspace
                        <p>Role: {session.user.role}</p>
                        <p>Email: {session.user.email}</p>
                        <p>User id: {session.user.id}</p>
                    </div>
                </div>
            )}

            <Button onClick={handleSignOut}>LOGOUT</Button>
            <Button onClick={() => navigate("/")}>WorkHub</Button>
        </div>
    );
};

export default UserWorkSpace;