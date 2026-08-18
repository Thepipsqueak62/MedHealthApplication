import { authClient } from "@/lib/auth-client.ts";
import {Link, useNavigate} from "react-router-dom";
import {Button} from "@/components/ui/button.tsx";

function HomePage() {
    const { data: session, isPending } = authClient.useSession();
    const navigate = useNavigate();

    if (isPending) return <div>Loading...</div>;

    if (!session?.user) {
        return <Link to="/login">Sign in</Link>;
    }

    const workspacePath = session.user.role === "admin" ? "/admin/workspace" : "/user/workspace";

    return (
        <div>
            <p>Welcome, {session.user.name}</p>
            <div>Please Contact HR at the link below if u have any questions</div>
            <div>
                <Link className={"underline text-blue-200"} to={"/hrcontact"}>Contact HR</Link>
            </div>
            <Button onClick={()=> navigate(workspacePath)}>
                Go to WorkSpace
            </Button>

        </div>
    );
}

export default HomePage;