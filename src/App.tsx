import { useState, useEffect } from 'react';
import { Memory } from './types/firestore';
import { CreateMemory } from './components/CreateMemory';
import { Vault } from './components/Vault';
import { WeeklyMeeting } from './components/WeeklyMeeting';
import { Toast } from './components/Toast';
import { AmbientBackground } from './components/AmbientBackground';
import { TiltCard } from './components/TiltCard';
import { Button } from './components/Button';
import { CURRICULUM, MONTH_THEMES } from './data/curriculum';
import { LayoutGrid, Plus, History, MessageCircle } from 'lucide-react';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import { app } from './lib/firebase';
import { useAuth } from './context/AuthContext';
import { checkUserFamily } from './lib/firestore-utils';
import { useFamilyMembers, useMemories } from './hooks/useFirestoreData';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { useTranslation } from 'react-i18next';

function App() {
    const { t, i18n } = useTranslation();
    const { currentUser, logout } = useAuth();
    const [familyId, setFamilyId] = useState<string | null>(null);

    // FETCH REAL DATA
    const { members, loading: membersLoading } = useFamilyMembers(familyId);
    const { memories } = useMemories(familyId);

    // Initial Setup: Get Family ID
    useEffect(() => {
        if (currentUser) {
            checkUserFamily(currentUser.uid).then(fid => setFamilyId(fid));
        }
    }, [currentUser]);

    // Derived State
    const activeProfile = members.find(m => m.userId === currentUser?.uid);

    const [view, setView] = useState<'dashboard' | 'create-memory' | 'vault'>('dashboard');

    // TOOLS STATE
    const [showMeeting, setShowMeeting] = useState(false);
    const [toastMsg, setToastMsg] = useState<string | null>(null);

    // MOCK: Current time simulation
    const currentMonthId = 1;
    const currentWeekId = 1;

    useEffect(() => {
        console.log("Firebase Initialized:", app.name);
    }, []);

    const currentTheme = MONTH_THEMES[currentMonthId];
    const currentQuest = CURRICULUM.find(q => q.monthId === currentMonthId && q.weekId === currentWeekId);

    const showToast = (msg: string) => {
        setToastMsg(msg);
        setTimeout(() => setToastMsg(null), 3000);
    };

    const handleLogout = async () => {
        await logout();
    };

    const handleSaveMemory = (memoryData: Partial<Memory>) => {
        // TODO: Actually save to Firestore using a utility function
        console.log("Saving memory (local only for now):", memoryData);
        // Optimistic update for now or just let the hook handle it when we implement save logic
        setView('vault');
    };

    // LOADING STATE
    if (membersLoading || !activeProfile) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <AmbientBackground themeName="indigo" />
                <div className="text-center space-y-4 z-10 relative">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-200 border-t-indigo-600 mx-auto"></div>
                    <p className="text-indigo-900 font-bold animate-pulse">{t('dashboard.loading')}</p>
                    {!membersLoading && !activeProfile && (
                        <p className="text-sm text-red-500 bg-white/80 p-2 rounded">
                            {t('dashboard.critical_error')}
                        </p>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pb-24 relative overflow-hidden">
            <AmbientBackground themeName={currentTheme?.color} />

            {/* HEADER */}
            <header className="bg-white/80 backdrop-blur-md p-4 shadow-sm sticky top-0 z-30 flex items-center justify-between border-b border-white/20">
                <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity" onClick={handleLogout}>
                    <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-xl border-2"
                        style={{ borderColor: activeProfile.color, backgroundColor: `${activeProfile.color}20` }}
                    >
                        {activeProfile.avatarUrl}
                    </div>
                    <div>
                        <h2 className="font-bold leading-tight text-ink">{activeProfile.name}</h2>
                        <div className="text-xs text-slate-500 font-bold flex items-center gap-1">
                            <span className="text-yellow-500">★</span> {activeProfile.xp} XP
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <LanguageSwitcher />
                    <h1 className="text-lg font-serif font-black italic tracking-tighter text-indigo-600/20 hidden sm:block">FamilyLifeOS</h1>
                </div>
            </header>

            {/* MAIN CONTENT AREA */}
            <main className="p-4 max-w-lg mx-auto relative z-10">
                <AnimatePresence mode='wait'>
                    {view === 'dashboard' && (
                        <motion.div
                            key="dashboard"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-6"
                        >
                            {/* Weekly Quest Banner */}
                            {currentQuest && (
                                <TiltCard className="perspective-1000">
                                    <div className={clsx("rounded-[2.5rem] p-8 text-white shadow-2xl shadow-indigo-500/20 relative overflow-hidden bg-gradient-to-br",
                                        currentTheme?.color === 'indigo' && 'from-indigo-400 via-indigo-600 to-purple-700',
                                        currentTheme?.color === 'blue' && 'from-blue-400 via-blue-600 to-cyan-700',
                                        currentTheme?.color === 'pink' && 'from-pink-400 via-pink-600 to-rose-700',
                                        currentTheme?.color === 'green' && 'from-green-400 via-green-600 to-emerald-700',
                                        currentTheme?.color === 'emerald' && 'from-emerald-400 via-emerald-600 to-teal-700',
                                        currentTheme?.color === 'orange' && 'from-orange-400 via-orange-600 to-red-700',
                                        currentTheme?.color === 'yellow' && 'from-yellow-400 via-yellow-500 to-orange-600',
                                        currentTheme?.color === 'purple' && 'from-purple-400 via-purple-600 to-indigo-700',
                                        currentTheme?.color === 'teal' && 'from-teal-400 via-teal-600 to-blue-700',
                                        currentTheme?.color === 'rose' && 'from-rose-400 via-rose-600 to-pink-700',
                                        currentTheme?.color === 'cyan' && 'from-cyan-400 via-cyan-600 to-blue-700',
                                        currentTheme?.color === 'red' && 'from-red-400 via-red-600 to-rose-700',
                                        !currentTheme && 'from-indigo-500 to-purple-600'
                                    )}>
                                        <div className="relative z-10 flex flex-col items-start gap-4">
                                            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 uppercase text-[10px] font-bold tracking-widest shadow-inner">
                                                <span>{currentTheme?.icon}</span>
                                                <span>{t('dashboard.week')} {currentQuest.weekId}</span>
                                            </div>

                                            <div>
                                                <h3 className="text-3xl font-serif font-bold mb-2 leading-tight tracking-tight drop-shadow-md">{currentQuest.title}</h3>
                                                <p className="opacity-95 text-base font-medium leading-relaxed max-w-[90%] text-white/90">{currentQuest.description}</p>
                                            </div>

                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={(e) => { e.stopPropagation(); setView('create-memory'); }}
                                                className="mt-2 bg-white text-indigo-950 hover:bg-indigo-50 shadow-xl"
                                            >
                                                <Plus size={18} strokeWidth={3} />
                                                {t('dashboard.log_task')}
                                                <span className="bg-indigo-100/50 px-2 py-0.5 rounded-lg text-xs ml-1 font-extrabold">+ {currentQuest.xpReward} XP</span>
                                            </Button>
                                        </div>

                                        {/* Decorative Depth Elements */}
                                        <div className="absolute -top-12 -right-12 w-48 h-48 bg-white opacity-10 rounded-full blur-3xl pointer-events-none mix-blend-overlay"></div>
                                        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-black opacity-10 rounded-full blur-3xl pointer-events-none mix-blend-overlay"></div>
                                    </div>
                                </TiltCard>
                            )}

                            {/* Recent Memories Teaser */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between ml-2">
                                    <h3 className="font-bold text-slate-400 text-sm uppercase tracking-wider">{t('dashboard.recent_memories')}</h3>
                                    <button onClick={() => setView('vault')} className="text-indigo-600 text-xs font-bold uppercase tracking-wider hover:text-indigo-800 transition-colors">{t('common.view_all')}</button>
                                </div>

                                {memories.slice(0, 3).map(mem => (
                                    <motion.div
                                        key={mem.id}
                                        className="bg-white/80 backdrop-blur-sm p-4 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4 hover:bg-white hover:shadow-md transition-all cursor-pointer group"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300 shadow-sm">🌱</div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-1 m-2 bg-indigo-200 rounded-full self-stretch" />
                                            <div>
                                                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                                                    {new Date(mem.createdAt).toLocaleDateString(i18n.language)}
                                                </div>
                                                <p className="text-slate-700 font-medium line-clamp-2">{mem.content}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* TOOLS GRID */}
                            <div className="pb-24">
                                <h3 className="text-sm font-bold text-slate-400 mb-4 px-2 uppercase tracking-wider">{t('dashboard.your_tools')}</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        onClick={() => setShowMeeting(true)}
                                        className="bg-white/90 backdrop-blur p-6 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col items-center gap-4 hover:scale-[1.03] transition-transform active:scale-95 group"
                                    >
                                        <div className="w-16 h-16 bg-indigo-50 text-indigo-500 rounded-3xl flex items-center justify-center group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-indigo-200 group-hover:shadow-lg">
                                            <MessageCircle size={32} fill="currentColor" className="opacity-20 absolute scale-150 blur-sm" />
                                            <MessageCircle size={28} className="relative z-10" />
                                        </div>
                                        <div className="text-center">
                                            <span className="block font-bold text-slate-700 text-lg group-hover:text-indigo-600 transition-colors">{t('dashboard.weekly_meeting')}</span>
                                            <span className="text-xs text-slate-400 font-medium">4 skref</span>
                                        </div>
                                    </button>

                                    <button className="bg-white/60 p-6 rounded-[2rem] shadow-none border border-slate-100 flex flex-col items-center gap-4 opacity-60 cursor-not-allowed">
                                        <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center grayscale opacity-50">
                                            <span className="text-3xl">🧹</span>
                                        </div>
                                        <div className="text-center">
                                            <span className="block font-bold text-slate-700 text-lg">{t('dashboard.chores')}</span>
                                            <span className="text-xs text-slate-400 font-medium">{t('common.coming_soon')}</span>
                                        </div>
                                    </button>
                                </div>
                            </div>

                        </motion.div>
                    )}

                    {view === 'create-memory' && (
                        <motion.div
                            key="create-memory"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                        >
                            <CreateMemory
                                members={members}
                                currentUser={activeProfile}
                                onClose={() => setView('dashboard')}
                                onSave={(data) => {
                                    handleSaveMemory(data);
                                    if (currentQuest) {
                                        showToast(t('dashboard.toast_xp_gain', { xp: currentQuest.xpReward, name: activeProfile.name }));
                                    } else {
                                        showToast(t('dashboard.toast_memory_saved'));
                                    }
                                }}
                            />
                        </motion.div>
                    )}

                    {view === 'vault' && (
                        <motion.div
                            key="vault"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <Vault currentUser={activeProfile} memories={memories} members={members} />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* MODALS */}
                <AnimatePresence>
                    {showMeeting && (
                        <WeeklyMeeting onClose={() => setShowMeeting(false)} />
                    )}
                </AnimatePresence>

                {/* TOAST NOTIFICATION */}
                <Toast
                    message={toastMsg || ''}
                    isVisible={!!toastMsg}
                    onClose={() => setToastMsg(null)}
                />

            </main>

            {/* BOTTOM NAV BAR */}
            <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-slate-200/60 p-2 safe-bottom z-40 shadow-up">
                <div className="flex justify-around items-center max-w-lg mx-auto relative">
                    <NavBtn icon={<LayoutGrid size={24} />} label={t('nav.home')} active={view === 'dashboard'} onClick={() => setView('dashboard')} />

                    <div className="relative -top-8 group">
                        <div className="absolute inset-0 bg-indigo-500 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity animate-pulse"></div>
                        <button
                            onClick={() => setView('create-memory')}
                            className="relative w-16 h-16 bg-gradient-to-tr from-indigo-600 to-indigo-500 rounded-full flex items-center justify-center text-white shadow-xl shadow-indigo-300 active:scale-95 transition-all border-4 border-white group-hover:-translate-y-1 duration-300"
                        >
                            <Plus size={32} strokeWidth={3} />
                        </button>
                    </div>

                    <NavBtn icon={<History size={24} />} label={t('nav.vault')} active={view === 'vault'} onClick={() => setView('vault')} />
                </div>
            </nav>
        </div>
    );
}

function NavBtn({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className={clsx(
                "flex flex-col items-center gap-1 p-2 w-16 transition-colors rounded-2xl",
                active ? "text-indigo-600 bg-indigo-50 font-bold" : "text-slate-400 font-medium hover:bg-slate-50"
            )}
        >
            {icon}
            <span className="text-[10px]">{label}</span>
        </button>
    );
}

export default App;
