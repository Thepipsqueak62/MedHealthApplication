import { Link } from "react-router-dom";
import {useUserStore} from "@/store/Userstore.ts";
import { Button } from "@/components/ui/button.tsx";

function HomePage() {
    const user = useUserStore((s) => s.user);

    return (
        <div className="max-w-sm mx-auto mt-20 text-center">
            <h1 className="text-xl font-semibold mb-4">MedTrax</h1>

            {user ? (
                <div className="flex flex-col gap-2">
                    <p>Signed in as {user.name} ({user.role})</p>
                    <Link to={user.role === "admin" ? "/admin" : "/user"}>
                        <Button className="w-full">Go to my dashboard</Button>
                    </Link>
                </div>
            ) : (
                <Link to="/login">
                    <Button className="w-full">Sign in</Button>
                </Link>
            )}
        </div>
    );
}

export default HomePage;