import {useUserStore} from "@/store/Userstore.ts";
import {Button} from "@/components/ui/button.tsx";
import {authClient} from "@/lib/auth-client.ts";




const UserPage = () => {
    const user = useUserStore((s) => s.user);
    const clearUser = useUserStore((s) => s.clearUser);
    const setStatus = useUserStore((s) => s.setStatus);
    async function handleSignOut(){
        const {error} = await authClient.signOut();

        clearUser()
        setStatus(error? `Error: ${error.message}`:"Signed Out");

    }

    return (
        <div>
            <p>WELCOME TO THE USER PAGE</p>
            {user && (
                <p>
                    Logged in as {user.name} ({user.role})
                    {user.email}|{user.dateOfBirth}|{user.phoneNumber}
                </p>

            )}
            <Button onClick={handleSignOut}>
                LOGOUT
            </Button>
        </div>

    );
};

export default UserPage;