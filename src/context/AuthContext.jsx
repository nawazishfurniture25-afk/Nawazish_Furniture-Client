import { createContext, useContext, useEffect, useState } from 'react';
import { login as apiLogin, getMe } from '../lib/api';

const AuthContext = createContext(null);

const TOKEN_KEY = 'nawazish_admin_token';
const USER_KEY = 'nawazish_admin_user';

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem(TOKEN_KEY);
        const savedUser = localStorage.getItem(USER_KEY);

        if (token && savedUser) {
            try {
                setUser(JSON.parse(savedUser));
                getMe()
                    .then((res) => {
                        setUser(res.data.data);
                        localStorage.setItem(USER_KEY, JSON.stringify(res.data.data));
                    })
                    .catch(() => {
                        localStorage.removeItem(TOKEN_KEY);
                        localStorage.removeItem(USER_KEY);
                        setUser(null);
                    })
                    .finally(() => setLoading(false));
            } catch {
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (email, password) => {
        const res = await apiLogin({ email, password });
        const { token, ...userData } = res.data.data;
        localStorage.setItem(TOKEN_KEY, token);
        localStorage.setItem(USER_KEY, JSON.stringify(userData));
        setUser(userData);
        return userData;
    };

    const logout = () => {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{ user, loading, isAuthenticated: !!user, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
}