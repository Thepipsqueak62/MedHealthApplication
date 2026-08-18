// lib/ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { authClient } from "@/lib/auth-client.ts";
import {useEffect} from "react";

type Role = "admin" | "user" | "doctor" | "nurse";

interface ProtectedRouteProps {
    allowedRoles?: Role[];
}

export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
    const { data: session, isPending,refetch } = authClient.useSession();
    useEffect(() => {
        refetch();
    })

    if (isPending) {return <div>Loading...</div>;}
    if (!session?.user) {return <Navigate to="/login" replace />;}
    if (allowedRoles && !allowedRoles.includes(session.user.role as Role)) {return <Navigate to="/unauthorized" replace />;}

    return <Outlet />;
}