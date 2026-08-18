import { Navigate, Outlet } from "react-router-dom";
import {useUserStore} from "@/store/Userstore.ts";

function ProtectedRoute({ allowedRoles }: { allowedRoles?: string[] }) {
    const user = useUserStore((s) => s.user);
    const isLoading = useUserStore((s) => s.isLoading);

    if (isLoading) return <div>Loading...</div>; // avoid flicker/false redirect

    if (!user) return <Navigate to="/login" replace />;

    if (allowedRoles && !allowedRoles.includes(user.role ?? "")) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <Outlet/>;
}

export default ProtectedRoute;