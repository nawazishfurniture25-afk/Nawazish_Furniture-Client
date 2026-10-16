import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';

import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { WishlistProvider } from './context/WishlistContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <HelmetProvider>
            <BrowserRouter>
                <ThemeProvider>
                    <AuthProvider>
                        <CartProvider>
                            <WishlistProvider>
                                <App />
                                <Toaster
                                    position="bottom-center"
                                    toastOptions={{
                                        style: {
                                            background: '#1c1a16',
                                            color: '#f6f1e7',
                                            fontSize: '13px',
                                            borderRadius: '0',
                                            padding: '12px 22px',
                                            maxWidth: '90vw',
                                        },
                                        success: {
                                            iconTheme: { primary: '#a37b34', secondary: '#f6f1e7' },
                                        },
                                    }}
                                />
                            </WishlistProvider>
                        </CartProvider>
                    </AuthProvider>
                </ThemeProvider>
            </BrowserRouter>
        </HelmetProvider>
    </React.StrictMode>
);