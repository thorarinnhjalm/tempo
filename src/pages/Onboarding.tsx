import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { createFamily } from '../lib/firestore-utils';
import { Button } from '../components/Button';
import { AmbientBackground } from '../components/AmbientBackground';
import { Users, UserPlus, ArrowRight, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function Onboarding() {
    const { t } = useTranslation();
    const { currentUser } = useAuth();

    const [mode, setMode] = useState<'selection' | 'create' | 'join'>('selection');
    const [familyName, setFamilyName] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleCreateFamily = async () => {
        if (!currentUser || !familyName.trim()) return;

        setSubmitting(true);
        try {
            await createFamily(familyName, currentUser);
            // After creation, redirect to dashboard. 
            // The OnboardingGuard will re-check and see the new familyId.
            window.location.href = '/';
        } catch (error) {
            console.error("Failed to create family", error);
            alert("Failed to create family. Please try again.");
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden bg-slate-50">
            <AmbientBackground themeName="indigo" />

            <div className="relative z-10 w-full max-w-md space-y-8">

                {/* HEADLINE */}
                <div className="text-center space-y-2">
                    <h1 className="text-4xl font-black text-slate-800 tracking-tight">{t('onboarding.welcome')}</h1>
                    <p className="text-slate-500 font-medium text-lg">{t('onboarding.lets_setup')}</p>
                </div>

                {/* CARD Content */}
                <div className="bg-white/90 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-2xl border border-white/50">

                    {/* MODE: SELECTION */}
                    {mode === 'selection' && (
                        <div className="space-y-4">
                            <button
                                onClick={() => setMode('create')}
                                className="w-full p-6 text-left bg-indigo-50 border-2 border-indigo-100 rounded-3xl hover:bg-indigo-100 hover:border-indigo-300 transition-all group"
                            >
                                <div className="w-12 h-12 bg-indigo-500 text-white rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-indigo-200 group-hover:scale-110 transition-transform">
                                    <Users size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-800">{t('onboarding.create_new')}</h3>
                                <p className="text-slate-500 text-sm mt-1 leading-snug">{t('onboarding.create_new_desc')}</p>
                            </button>

                            <button
                                onClick={() => setMode('join')}
                                className="w-full p-6 text-left bg-white border-2 border-slate-100 rounded-3xl hover:border-indigo-300 hover:shadow-lg transition-all group"
                            >
                                <div className="w-12 h-12 bg-white border-2 border-slate-100 text-slate-400 rounded-2xl flex items-center justify-center mb-4 group-hover:text-indigo-500 transition-colors">
                                    <UserPlus size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-800">{t('onboarding.join_existing')}</h3>
                                <p className="text-slate-500 text-sm mt-1 leading-snug">{t('onboarding.join_existing_desc')}</p>
                            </button>
                        </div>
                    )}

                    {/* MODE: CREATE */}
                    {mode === 'create' && (
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-slate-500 uppercase tracking-wider mb-2 ml-2">{t('onboarding.family_name_label')}</label>
                                <input
                                    autoFocus
                                    type="text"
                                    placeholder={t('onboarding.placeholder_name')}
                                    className="w-full text-2xl font-bold bg-slate-50 border-2 border-slate-200 rounded-2xl p-4 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 outline-none transition-all placeholder:text-slate-300 text-slate-800"
                                    value={familyName}
                                    onChange={(e) => setFamilyName(e.target.value)}
                                />
                            </div>

                            <div className="flex gap-3">
                                <Button
                                    variant="ghost"
                                    onClick={() => setMode('selection')}
                                    className="flex-1"
                                >
                                    {t('common.back')}
                                </Button>
                                <Button
                                    disabled={!familyName || submitting}
                                    onClick={handleCreateFamily}
                                    className="flex-[2] bg-indigo-600 text-white shadow-xl shadow-indigo-200"
                                >
                                    {submitting ? <Loader2 className="animate-spin" /> : <>{t('onboarding.create_btn')} <ArrowRight size={20} /></>}
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* MODE: JOIN */}
                    {mode === 'join' && (
                        <div className="space-y-6 text-center py-8">
                            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-300">
                                <UserPlus size={40} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-800">{t('common.coming_soon')}</h3>
                                <p className="text-slate-500">{t('onboarding.invite_construction')}</p>
                            </div>
                            <Button
                                variant="outline"
                                onClick={() => setMode('selection')}
                                className="w-full"
                            >
                                {t('onboarding.go_back')}
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
