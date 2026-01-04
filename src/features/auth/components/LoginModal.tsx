'use client';

import { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import { useAuth } from '@/src/features/auth/hooks/useAuth';
import { useAuthUI } from '@/src/features/auth/hooks/useAuthUI';
import { authService } from '../services';

export default function LoginModal() {
    const { loginAsync, isLoggingIn } = useAuth();
    const { isLoginModalOpen, closeLoginModal } = useAuthUI();
    const [isSignUp, setIsSignUp] = useState(true);
    const [formData, setFormData] = useState({
        name: 'uttam',
        email: 'uttamgupta0908@gmail.com',
        password: 'Uttam@0908'
    });

    if (!isLoginModalOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (isSignUp) {
                // Register
                await authService.register({
                    email: formData.email.trim().toLowerCase(),
                    password: formData.password.trim(),
                    full_name: formData.name.trim(),
                    username: formData.email.trim().split('@')[0],
                });
                // Auto login after register or show success message?
                // API returns success message usually. Let's try loggin in automatically or switching to login.
                // For now, let's just alert or switch to login
                setIsSignUp(false);
                alert('Registration successful! Please sign in.');
            } else {
                // Login
                await loginAsync({
                    email: formData.email.trim().toLowerCase(),
                    password: formData.password.trim()
                });
                closeLoginModal();
            }
        } catch (error: any) {
            console.error('Auth failed:', error);
            // Show error to user
            const errorMsg = error.response?.data?.details
                ? JSON.stringify(error.response.data.details)
                : (error.response?.data?.error || 'Authentication failed');
            alert(errorMsg);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div
                className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="relative p-5">
                    <button
                        onClick={closeLoginModal}
                        className="absolute right-3 top-3 p-1.5 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-full transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>

                    <div className="text-center mt-2 mb-4">
                        <h2 className="text-xl font-bold text-neutral-800 mb-1">
                            {isSignUp ? 'Create account' : 'Welcome back'}
                        </h2>
                        <p className="text-sm text-neutral-600">
                            {isSignUp ? 'Join Vync today.' : 'Sign in to continue.'}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-3 mb-4">
                        {isSignUp && (
                            <div>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-3 py-2.5 text-sm rounded-xl border border-neutral-300 focus:border-primary-300 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
                                    required
                                />
                            </div>
                        )}
                        <div>
                            <input
                                type="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full px-3 py-2.5 text-sm rounded-xl border border-neutral-300 focus:border-primary-300 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="w-full px-3 py-2.5 text-sm rounded-xl border border-neutral-300 focus:border-primary-300 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoggingIn}
                            className="w-full py-2.5 px-4 bg-primary-300 hover:bg-primary-200 text-neutral-100 font-bold rounded-xl text-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoggingIn ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                isSignUp ? 'Sign Up' : 'Sign In'
                            )}
                        </button>
                    </form>

                    <div className="relative mb-4">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-neutral-200"></div>
                        </div>
                        <div className="relative flex justify-center text-xs">
                            <span className="px-2 bg-white text-neutral-500">Or continue with</span>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <button
                            type="button"
                            onClick={() => alert('Facebook login not implemented yet')}
                            className="w-full py-2.5 px-4 bg-neutral-900 hover:bg-neutral-800 text-white font-bold rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
                        >
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z" />
                            </svg>
                            Facebook
                        </button>

                        <button
                            type="button"
                            onClick={() => alert('Google login not implemented yet')}
                            className="w-full py-2.5 px-4 bg-white border border-neutral-200 hover:bg-neutral-50 text-neutral-800 font-bold rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
                        >
                            <svg className="w-4 h-4" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            Google
                        </button>
                    </div>

                    <div className="mt-4 text-center">
                        <p className="text-xs text-neutral-600">
                            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                            <button
                                onClick={() => setIsSignUp(!isSignUp)}
                                className="text-primary-300 font-bold hover:underline"
                            >
                                {isSignUp ? 'Sign In' : 'Sign Up'}
                            </button>
                        </p>
                    </div>

                    <p className="text-[10px] text-neutral-400 text-center mt-4">
                        By continuing, you agree to our Terms and Privacy Policy.
                    </p>
                </div>
            </div>
        </div>
    );
}
