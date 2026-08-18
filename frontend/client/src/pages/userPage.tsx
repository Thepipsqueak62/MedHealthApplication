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
            {user && (
                <div>
                    <div>
                        Welcome {user.name} to your workspace
                        <p>Role{user.role}</p>
                        <p>Email: {user.email}</p>
                        <p>PhoneNumber: {user.phoneNumber}</p>
                        <p>Date Of Birth: {user.dateOfBirth}</p>
                        <p>Created At Date: {new Date(user.createdAt).toLocaleString()}</p>
                        <p>Last Updated: {new Date(user.updatedAt).toLocaleString()}</p>
                        <p>isEmailVerified: {user.emailVerified ?"Yes":"No"}</p>
                        <p>User id: {user.id}</p>
                    </div>

                </div>
            )}

            <Button onClick={handleSignOut}>
                LOGOUT
            </Button>
        </div>

    );
};

export default UserPage;