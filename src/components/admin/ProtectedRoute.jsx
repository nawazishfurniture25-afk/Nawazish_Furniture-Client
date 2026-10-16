import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function ProtectedRoute({ children }) {
    const { isAuthenticated, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div
                className="min-h-screen flex items-center justify-center"
                style={{ background: 'var(--bg)' }}
            >
                <div
                    className="w-10 h-10 border-2 border-t-transparent rounded-full animate-spin"
                    style={{ borderColor: 'var(--gold)', borderTopColor: 'transparent' }}
                />
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/admin" state={{ from: location }} replace />;
    }

    return children;
}