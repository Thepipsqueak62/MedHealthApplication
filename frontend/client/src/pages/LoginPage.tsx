import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authClient } from "@/lib/auth-client.ts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button.tsx";
import {useUserStore} from "@/store/Userstore.ts";

interface ICustomSignUpFields {
    phoneNumber?: string;
    dateOfBirth?: string;
    licenseNumber?: string;
}

function LoginPage() {
    const navigate = useNavigate();
    const setUser = useUserStore((s) => s.setUser);
    const status = useUserStore((s) => s.status);
    const setStatus = useUserStore((s) => s.setStatus);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");

    async function handleSignUp() {
        const { data, error } = await authClient.signUp.email({
            email,
            password,
            name: username,
            phoneNumber,
            dateOfBirth,
        } as Parameters<typeof authClient.signUp.email>[0] & ICustomSignUpFields);

        if (error) {
            setStatus(`Error: ${error.message}`);
            return;
        }

        setUser(data.user as unknown as ReturnType<typeof useUserStore.getState>["user"]);
        setStatus(`Signed up successfully ${data.user.email}`);
        navigateAfterLogin(data.user.role);
    }

    async function handleSignIn() {
        const { data, error } = await authClient.signIn.email({
            email,
            password,
        });

        if (error) {
            setStatus(`Error: ${error.message}`);
            return;
        }

        setUser(data.user as unknown as ReturnType<typeof useUserStore.getState>["user"]);
        setStatus(`Signed in: ${data.user.email}`);
        navigateAfterLogin(data.user.role);
    }

    function navigateAfterLogin(role?: string | null) {
        if (role === "admin") {
            navigate("/admin");
        } else {
            navigate("/user");
        }
    }

    return (
        <Card className="max-w-sm mx-auto mt-20">
            <CardHeader>
                <CardTitle className="text-xl">Welcome to MedTrax</CardTitle>
            </CardHeader>

            <CardContent>
                <form className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="you@example.com" onChange={e => setEmail(e.target.value)} />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" placeholder="••••••••" onChange={e => setPassword(e.target.value)} />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <Label htmlFor="username">Username</Label>
                        <Input id="username" type="text" placeholder="username" onChange={e => setUsername(e.target.value)} />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <Label htmlFor="phoneNumber">Phone Number</Label>
                        <Input
                            id="phoneNumber"
                            type="tel"
                            placeholder="(555) 555-5555"
                            onChange={e => setPhoneNumber(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <Label htmlFor="dateOfBirth">Date of Birth</Label>
                        <Input
                            id="dateOfBirth"
                            type="date"
                            onChange={e => setDateOfBirth(e.target.value)}
                        />
                    </div>

                    <Button type="button" onClick={handleSignIn} variant="secondary" className="w-full">
                        Sign In
                    </Button>
                    <Button type="button" onClick={handleSignUp} className="w-full mt-2">
                        Sign Up
                    </Button>
                </form>

                <p className="mt-4 text-sm text-muted-foreground">{status}</p>
            </CardContent>
        </Card>
    );
}

export default LoginPage;