import { Navigate } from 'react-router'
import { useAuthStore } from '../../store/Auth'
import type { ReactNode } from 'react';

interface ProtectedRouteProps {
    children: ReactNode;
}

export function Protected_Route({ children } :ProtectedRouteProps) {
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn)
    if (!isLoggedIn) {
        return <Navigate to="/login" replace />
    }

    return children
}