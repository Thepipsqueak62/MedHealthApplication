import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "@/pages/HomePage.tsx";
import { ModeToggle } from "@/components/mode-toggle.tsx";
import LoginPage from "@/pages/LoginPage.tsx";
import ProtectedRoute from "@/lib/ProtectedRoute.tsx";
import UserWorkSpace from "@/pages/User/UserWorkSpace.tsx";
import AdminWorkSpace from "@/pages/Admin/AdminWorkSpace.tsx";

function App() {
  return (
      <BrowserRouter>
        <ModeToggle/>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/unauthorized" element={<div>Not authorized</div>} />

          <Route element={<ProtectedRoute />}>
            <Route path="/user/workspace" element={<UserWorkSpace/>} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path="/admin/workspace" element={<AdminWorkSpace/>} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;