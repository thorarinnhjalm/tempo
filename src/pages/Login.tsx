import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Button } from '../components/Button';
import { AmbientBackground } from '../components/AmbientBackground';
import { useTranslation } from 'react-i18next';

export function Login() {
    const { t } = useTranslation();
    const { signInWithGoogle, currentUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser) {
            navigate('/app');
        }
    }, [currentUser, navigate]);

    const handleLogin = async () => {
        try {
            await signInWithGoogle();
            navigate('/app');
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-slate-50">
            <AmbientBackground themeName="indigo" />

            <div className="relative z-10 bg-white/80 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-2xl border border-white/50 max-w-sm w-full text-center space-y-8">
                <div>
                    <h1 className="text-4xl font-serif font-black italic tracking-tighter text-indigo-900 mb-2">{t('auth.slogan')}</h1>
                    <p className="text-slate-500 font-medium">Family Life OS</p>
                </div>

                <div className="space-y-4">
                    <Button
                        onClick={handleLogin}
                        className="w-full bg-indigo-600 text-white shadow-lg shadow-indigo-200 py-4 text-lg"
                    >
                        {t('auth.sign_in_google')}
                    </Button>
                    <p className="text-xs text-slate-400">
                        {t('auth.disclaimer')}
                    </p>
                </div>
            </div>
        </div>
    );
}
