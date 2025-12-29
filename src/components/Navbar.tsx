import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthProvider';
import { LanguageSwitcher } from './LanguageSwitcher';
import { PlusCircle, LogIn, User, Home } from 'lucide-react';

export const Navbar = () => {
    const { user, signOut } = useAuth();
    const { t } = useTranslation();

    return (
        <nav className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo Section */}
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">UM</span>
                            </div>
                            <span className="font-bold text-slate-800 text-xl hidden sm:block">{t('nav.home')}</span>
                        </Link>

                        <Link to="/" className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors ml-2 sm:ml-4">
                            <Home className="w-5 h-5" />
                        </Link>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4">

                        <Link
                            to="/sell"
                            className="hidden sm:flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full font-medium transition-all shadow-sm hover:shadow-md"
                        >
                            <PlusCircle className="w-4 h-4" />
                            <span>{t('nav.sell')}</span>
                        </Link>

                        <LanguageSwitcher />

                        <div className="h-6 w-px bg-slate-200"></div>

                        {user ? (
                            <div className="flex items-center gap-3">
                                <Link to="/profile" className="flex items-center gap-2 text-slate-700 hover:text-blue-600 font-medium">
                                    {user.user_metadata?.avatar_url ? (
                                        <img
                                            src={user.user_metadata.avatar_url}
                                            alt="Avatar"
                                            className="w-8 h-8 rounded-full object-cover border border-slate-200"
                                        />
                                    ) : (
                                        <User className="w-5 h-5" />
                                    )}
                                    <span className="hidden md:inline">{user.email?.split('@')[0]}</span>
                                </Link>
                                <button
                                    onClick={signOut}
                                    className="text-sm text-slate-500 hover:text-red-600"
                                >
                                    {t('nav.logout')}
                                </button>
                            </div>
                        ) : (
                            <Link to="/login" className="flex items-center gap-2 text-slate-700 hover:text-blue-600 font-medium">
                                <LogIn className="w-5 h-5" />
                                <span>{t('nav.login')}</span>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};
