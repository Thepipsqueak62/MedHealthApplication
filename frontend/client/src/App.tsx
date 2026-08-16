import { useState } from "react";
import {authClient} from "@/lib/auth-client.ts";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { ModeToggle } from "@/components/mode-toggle";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {Button} from "@/components/ui/button.tsx";


function App() {
  const [status, setStatus] = useState("");
  const [session, setSession] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  async function handleSignUp() {
    const { data, error } = await authClient.signUp.email({
      email: email,
      password: password,
      name: username,
    });

    setStatus(
        error
            ? `Error: ${error.message}`
            : `Signed up successfully ${data.user.email}`
    );
  }

  async function handleSignIn() {
    const { data, error } = await authClient.signIn.email({
      email: email,
      password: password,
    });

    if (error) {
      setStatus(`Error: ${error.message}`);
      return;
    }

    setSession(data);
    setStatus(`Signed in: ${data.user.email}`);
  }

  async function handleGetSession() {
    const { data, error } = await authClient.getSession();

    if (error) {
      setStatus(`Error: ${error.message}`);
      return;
    }

    if (data) {
      setSession(data);
      setStatus(`Session active: ${data.user.email}`);
    } else {
      setSession(null);
      setStatus("No session");
    }
  }

  async function handleSignOut() {
    const { error } = await authClient.signOut();

    setSession(null);

    setStatus(
        error ? `Error: ${error.message}` : "Signed out"
    );
  }

  return (
      <div>
        <ModeToggle/>

        <div>WELCOME TO MED TRAX TESTING</div>

        <Card className=" max-w-sm mx-auto mt-20">
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
                <Input id="username" type="username" placeholder="username" onChange={e => setUsername(e.target.value)} />
              </div>


              <Button onClick={handleSignIn} variant="secondary" className="w-full">
                Sign In
              </Button>
              <Button onClick={handleSignUp} className="w-full mt-2">
                Sign Up
              </Button>

              <div className="flex items-center justify-between mt-2 text-sm">
                <Button
                    onClick={handleGetSession}
                    variant="link"
                    className="px-0 h-auto"
                >
                  Check session
                </Button>
                <Button
                    onClick={handleSignOut}
                    variant="destructive"
                    size="sm"
                >
                  Sign Out
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>


        <button onClick={handleGetSession}>CHECK SESSION</button>

        {session?.user && (
            <div>
              Logged in as {session.user.role}
            </div>
        )}

        <p>{status}</p>
      </div>
  );
}

export default App;