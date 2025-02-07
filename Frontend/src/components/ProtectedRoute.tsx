import { Navigate } from 'react-router-dom'

interface ProtectedRouterProps {
    children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouterProps) => {
    const user = sessionStorage.getItem('user');

    if (!user) {
        return <Navigate to='/' replace />
    }

    return <>{children}</>
}

export default ProtectedRoute;