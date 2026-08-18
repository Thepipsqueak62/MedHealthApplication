import { Button } from "@/components/ui/button.tsx";
import { useNavigate } from "react-router-dom";
import { useSignOut } from "@/hooks/useSignOut.ts";
import {type AppUser, authClient} from "@/lib/auth-client.ts";

const AdminWorkSpace = () => {
    const { data: session } = authClient.useSession();
    const user = session?.user as AppUser;
    const navigate = useNavigate();
    const handleSignOut = useSignOut();

    return (
        <div>
            <div>
                {user && (
                    <div>
                        <p className={"text-2xl font-bold"}>{user.name} Welcome to Your WorkSpace</p>
                        <p className={"text-red-800"}>Role: {user.role}</p>
                        <p className={"text-red-800"}>Email: {user.email}</p>
                        <p className={"text-red-800"}>User id: {user.id}</p>

                        <div className={"text-xl text-blue-200"}>
                            Note: This is the admin workspace when an admin user logs into his or hers account they will automatically be sent to this page.
                            an admin you will be able to do all your work duties from here.
                        </div>
                    </div>
                )}
            </div>
            <Button onClick={handleSignOut}>SIGN OUT</Button>
            <Button onClick={() => navigate("/")}>WorkHub</Button>
        </div>
    );
};

export default AdminWorkSpace;