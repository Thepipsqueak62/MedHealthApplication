import { create } from "zustand";

export interface AppUser {
    id: string;
    email: string;
    name: string;
    role?: string | null;
    phoneNumber?: string | null;
    dateOfBirth?: string | null;
    emailVerified: boolean;
    image: string | null;
    createdAt: string;
    updatedAt: string;
}

interface UserStore {
    user: AppUser | null;
    status: string;
    isLoading: boolean;
    setUser: (user: AppUser | null) => void;
    setStatus: (status: string) => void;
    setLoading: (loading: boolean) => void;
    clearUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
    user: null,
    status: "",
    isLoading: true, // starts true — we haven't checked the session yet on app load
    setUser: (user) => set({ user }),
    setStatus: (status) => set({ status }),
    setLoading: (isLoading) => set({ isLoading }),
    clearUser: () => set({ user: null }),
}));