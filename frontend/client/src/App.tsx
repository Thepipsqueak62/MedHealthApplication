import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { authClient } from "@/lib/auth-client.ts";
import {useUserStore} from "@/store/Userstore.ts";
import HomePage from "@/pages/HomePage.tsx";
import {ModeToggle} from "@/components/mode-toggle.tsx";
import LoginPage from "@/pages/LoginPage.tsx";
import ProtectedRoute from "@/lib/ProtectedRoute.tsx";
import UserPage from "@/pages/userPage.tsx";
import AdminPage from "@/pages/adminPage.tsx";


function App() {
  const setUser = useUserStore((s) => s.setUser);
  const setStatus = useUserStore((s) => s.setStatus);
  const setLoading = useUserStore((s) => s.setLoading);
  const clearUser = useUserStore((s) => s.clearUser);

  // one-time session bootstrap on app load — the server is the source of
  // truth for who's logged in, so we always re-check rather than trusting
  // any previously cached store state
  useEffect(() => {
    (async () => {
      const { data, error } = await authClient.getSession();
      if (error || !data) {
        clearUser();
      } else {
        setUser(data.user as unknown as ReturnType<typeof useUserStore.getState>["user"]);
        setStatus(`Session active: ${data.user.email}`);
      }
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
      <BrowserRouter>
        <ModeToggle/>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/unauthorized" element={<div>Not authorized</div>} />

          <Route element={<ProtectedRoute />}>
            <Route path="/user" element={<UserPage/>} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path="/admin" element={<AdminPage/>} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;