import { ArrowRight, Shield, Sparkles, Check, Play, Star, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Button } from '../components/Button';
import { TiltCard } from '../components/TiltCard';
import { AmbientBackground } from '../components/AmbientBackground';
import { useTranslation, Trans } from 'react-i18next';
import { SeoHead } from '../components/SeoHead';
import { LanguageSwitcher } from '../components/LanguageSwitcher';

export function MarketingSite() {
    const { t } = useTranslation();

    const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
        const [isOpen, setIsOpen] = useState(false);
        return (
            <div className="border-b border-stone-200">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center justify-between w-full py-6 text-left group"
                >
                    <span className="text-lg font-serif font-bold text-[#2c332e] group-hover:text-[#2d4a3e] transition-colors">{question}</span>
                    <ChevronDown className={`transition-transform duration-300 text-stone-400 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                        >
                            <p className="pb-6 leading-relaxed font-medium" style={{ color: '#57534e' }}>
                                {answer}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        );
    };

    return (
        <div className="min-h-screen font-sans bg-[#ffffff] selection:bg-[#d97757] selection:text-white overflow-x-hidden relative">
            <SeoHead />

            <AmbientBackground themeName="warm" />

            {/* NAV */}
            <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/70 border-b border-white/50">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#2d4a3e] to-[#3d6152] rounded-xl flex items-center justify-center text-white font-serif font-black text-xl shadow-lg">
                            F
                        </div>
                        <span className="font-serif font-bold text-xl tracking-tight text-[#2c332e] hidden sm:block">FamilyLifeOS</span>
                    </div>

                    <div className="hidden md:flex items-center gap-8 font-medium text-[#3d6152]">
                        <a href="#features" className="hover:text-[#2d4a3e] transition-colors">{t('marketing.nav_tools')}</a>
                        <a href="#methodology" className="hover:text-[#2d4a3e] transition-colors">{t('marketing.nav_worlds')}</a>
                        <a href="#pricing" className="hover:text-[#2d4a3e] transition-colors">{t('marketing.nav_pricing')}</a>
                        <LanguageSwitcher />
                    </div>

                    <Button size="sm" onClick={() => window.location.href = '/login'}>{t('marketing.btn_try_free')}</Button>
                </div>
            </nav>

            {/* HERO */}
            <header className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    <div className="relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e0a458]/10 text-[#b37628] font-bold text-sm tracking-wide uppercase border border-[#e0a458]/20 mb-8"
                        >
                            <Star size={14} fill="currentColor" /> {t('marketing.leikur_ad_laera')}
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                            className="text-5xl md:text-7xl font-bold leading-[1.1] text-[#2c332e] font-serif mb-6"
                        >
                            <Trans
                                i18nKey="marketing.hero_title"
                                components={{
                                    1: <span className="text-[#b05436] italic relative" />,
                                    2: <motion.span
                                        className="absolute bottom-1 left-0 w-full h-3 bg-[#d97757]/20 -z-10 rounded-full"
                                        initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ delay: 0.8, duration: 0.8 }}
                                    />
                                }}
                            />
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                            className="text-xl md:text-2xl text-stone-600 font-light leading-relaxed max-w-lg mb-10"
                        >
                            {t('marketing.hero_subtitle')}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                            className="flex flex-col sm:flex-row gap-4"
                        >
                            <Button variant="secondary" size="lg" onClick={() => window.location.href = '/login'}>
                                {t('marketing.start_journey')} <ArrowRight size={20} />
                            </Button>
                            <Button variant="outline" size="lg" onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}>
                                <Play size={20} /> {t('marketing.how_it_works')}
                            </Button>
                        </motion.div>

                        <div className="mt-12 flex items-center gap-4 text-xs font-bold text-stone-600 uppercase tracking-widest">
                            <div className="flex -space-x-2">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="w-8 h-8 rounded-full bg-stone-200 border-2 border-white" />
                                ))}
                            </div>
                            <span>{t('social_proof.title')}</span>
                        </div>
                    </div>

                    {/* HERO IMAGE / INTERFACE */}
                    <div className="relative perspective-[2000px]">
                        <TiltCard className="relative z-10 bg-white rounded-[2.5rem] shadow-2xl border-4 border-white/50 overflow-hidden max-w-md mx-auto lg:ml-auto lg:mr-0 rotate-y-[-12deg] rotate-x-[5deg]">
                            <div className="bg-[#2d4a3e] px-8 py-10 text-white text-center pb-16 relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                                <div className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase mb-4 shadow-sm border border-white/10">
                                    {t('marketing.weekly_quest')}
                                </div>
                                <h3 className="font-serif text-3xl font-bold leading-tight drop-shadow-md">{t('marketing.screen_free')}</h3>
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-white p-2 rounded-2xl shadow-xl">
                                    <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center text-3xl">🌿</div>
                                </div>
                            </div>

                            {/* App UI Body */}
                            <div className="pt-12 p-6 space-y-4 bg-slate-50 min-h-[350px]">
                                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
                                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-2xl border-2 border-white shadow-sm">🦁</div>
                                    <div>
                                        <div className="font-bold text-[#2c332e]">{t('marketing.mock_john_joined')}</div>
                                        <div className="text-xs text-slate-500 font-medium">✨ +500 XP</div>
                                    </div>
                                    <div className="ml-auto text-green-500"><Check size={20} /></div>
                                </div>
                                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 opacity-60">
                                    <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center text-2xl border-2 border-white shadow-sm">🦄</div>
                                    <div>
                                        <div className="font-bold text-[#2c332e]">{t('marketing.mock_anna_joined')}</div>
                                        <div className="text-xs text-slate-500">{t('marketing.mock_waiting')}</div>
                                    </div>
                                </div>

                                <div className="my-6 h-px bg-slate-200 w-full"></div>

                                <div className="bg-[#2d4a3e]/5 p-4 rounded-2xl border border-[#2d4a3e]/10">
                                    <h4 className="font-bold text-[#2d4a3e] text-sm mb-2">{t('marketing.purpose')}</h4>
                                    <p className="text-xs text-[#2d4a3e]/70 leading-relaxed">
                                        {t('marketing.purpose_desc')}
                                    </p>
                                </div>
                            </div>
                        </TiltCard>

                        {/* Decorative Blob */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-[#2d4a3e]/20 to-[#e0a458]/20 blur-3xl -z-10 rounded-full mix-blend-multiply" />
                    </div>
                </div>
            </header>

            {/* PROBLEM / SOLUTION */}
            <section className="py-24 relative overflow-hidden" style={{ backgroundColor: '#ffffff', color: '#2c332e' }}>
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="font-bold tracking-widest uppercase text-sm mb-2 block" style={{ color: '#b05436' }}>The Struggle</span>
                            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6" style={{ color: '#2c332e' }}>{t('marketing.problem_title')}</h2>
                            <p className="text-xl leading-relaxed mb-8" style={{ color: '#57534e' }}>
                                {t('marketing.problem_desc')}
                            </p>
                            <div className="h-1 w-20 rounded-full" style={{ backgroundColor: '#e7e5e4' }} />
                        </div>
                        <div>
                            <span className="font-bold tracking-widest uppercase text-sm mb-2 block" style={{ color: '#2d4a3e' }}>The Solution</span>
                            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6" style={{ color: '#2c332e' }}>{t('marketing.solution_title')}</h2>
                            <p className="text-xl leading-relaxed mb-8" style={{ color: '#57534e' }}>
                                {t('marketing.solution_desc')}
                            </p>
                            <Button onClick={() => window.location.href = '/login'} className="shadow-lg" style={{ backgroundColor: '#2d4a3e', color: '#ffffff' }}>
                                {t('marketing.start_journey')}
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* FEATURES / TWO SYSTEMS */}
            <section id="features" className="py-32 relative bg-stone-100" style={{ backgroundColor: '#f5f5f4' }}>
                <div className="absolute inset-0 bg-stone-50 skew-y-3 -z-10 origin-top transform scale-[1.1]"></div>

                <div className="max-w-4xl mx-auto px-6 text-center mb-16 relative">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 font-serif" style={{ color: '#2c332e' }}>{t('marketing.two_systems')}</h2>
                    <p className="text-xl text-stone-600 leading-relaxed">{t('marketing.two_systems_desc')}</p>
                </div>

                <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8">
                    {/* System 1: Utility */}
                    <div className="group relative">
                        <div className="absolute inset-0 rounded-[3rem] rotate-1 group-hover:rotate-2 transition-transform duration-500" style={{ backgroundColor: '#2d4a3e' }}></div>
                        <div className="relative bg-white p-10 rounded-[3rem] border border-stone-200 shadow-xl h-full flex flex-col items-start transition-transform duration-500 group-hover:-translate-y-2">
                            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8" style={{ backgroundColor: '#2d4a3e1a', color: '#2d4a3e' }}>
                                <Shield size={32} />
                            </div>

                            <h3 className="text-3xl font-bold mb-4 font-serif" style={{ color: '#2c332e' }}>Family OS</h3>
                            <p className="text-stone-600 mb-8 leading-relaxed text-lg">
                                {t('marketing.family_os_desc')}
                            </p>

                            <ul className="space-y-4 mt-auto">
                                {[t('marketing.feat_weekly_meetings'), t('marketing.feat_screen_rules'), t('marketing.feat_task_org')].map(item => (
                                    <li key={item} className="flex items-center gap-3 font-bold text-lg" style={{ color: '#2d4a3e' }}>
                                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm" style={{ backgroundColor: '#2d4a3e1a' }}>✓</div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* System 2: Play */}
                    <div className="group relative pt-12 md:pt-0">
                        <div className="absolute inset-0 rounded-[3rem] -rotate-1 group-hover:-rotate-2 transition-transform duration-500 md:top-0 top-12" style={{ backgroundColor: '#e0a458' }}></div>
                        <div className="relative bg-white p-10 rounded-[3rem] border border-stone-200 shadow-xl h-full flex flex-col items-start transition-transform duration-500 group-hover:-translate-y-2">
                            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8" style={{ backgroundColor: '#e0a4581a', color: '#b37628' }}>
                                <Sparkles size={32} />
                            </div>

                            <h3 className="text-3xl font-bold mb-4 font-serif" style={{ color: '#2c332e' }}>Memory Builder</h3>
                            <p className="text-stone-600 mb-8 leading-relaxed text-lg">
                                {t('marketing.memory_builder_desc')}
                            </p>

                            <ul className="space-y-4 mt-auto">
                                {[t('marketing.feat_diary'), t('marketing.feat_audio'), t('marketing.feat_emotions')].map(item => (
                                    <li key={item} className="flex items-center gap-3 font-bold text-lg" style={{ color: '#b37628' }}>
                                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm" style={{ backgroundColor: '#e0a4581a' }}>✓</div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* STATS / SOCIAL PROOF */}
            <section className="py-20" style={{ backgroundColor: '#ffffff', color: '#2c332e' }}>
                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12 text-center">
                    <div>
                        <div className="text-5xl font-black font-serif mb-2" style={{ color: '#2d4a3e' }}>1,000+</div>
                        <div className="font-bold uppercase tracking-widest text-sm" style={{ color: '#2c332e' }}>{t('social_proof.stat_1')}</div>
                    </div>
                    <div>
                        <div className="text-5xl font-black font-serif mb-2" style={{ color: '#2d4a3e' }}>50k+</div>
                        <div className="font-bold uppercase tracking-widest text-sm" style={{ color: '#2c332e' }}>{t('social_proof.stat_2')}</div>
                    </div>
                    <div>
                        <div className="text-5xl font-black font-serif mb-2" style={{ color: '#2d4a3e' }}>100k+</div>
                        <div className="font-bold uppercase tracking-widest text-sm" style={{ color: '#2c332e' }}>{t('social_proof.stat_3')}</div>
                    </div>
                </div>
            </section>

            {/* PRICING */}
            <section id="pricing" className="py-32 relative overflow-hidden" style={{ backgroundColor: '#ffffff', color: '#2c332e' }}>
                <div className="max-w-4xl mx-auto text-center relative z-10 px-6">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 font-serif" style={{ color: '#2c332e' }}>
                        <Trans i18nKey="marketing.pricing_title" components={{ 1: <br /> }} />
                    </h2>
                    <p className="text-xl mb-16 max-w-lg mx-auto" style={{ color: '#57534e' }}>{t('marketing.pricing_subtitle')}</p>

                    <div className="grid md:grid-cols-2 gap-8 items-center">

                        {/* Monthly */}
                        <TiltCard>
                            <div className="p-10 rounded-[2.5rem] border border-stone-200 shadow-xl transition-colors" style={{ backgroundColor: '#ffffff', color: '#2c332e' }}>
                                <h3 className="text-xl font-bold mb-2 opacity-80" style={{ color: '#2c332e' }}>{t('marketing.monthly')}</h3>
                                <div className="text-5xl font-serif font-bold mb-2" style={{ color: '#2c332e' }}>2.990 kr</div>
                                <div className="text-sm opacity-60 mb-8 font-medium" style={{ color: '#57534e' }}>{t('marketing.billed_monthly')}</div>
                                <Button variant="outline" className="w-full border-stone-200 hover:bg-stone-50" style={{ color: '#2c332e' }}>
                                    {t('marketing.choose_monthly')}
                                </Button>
                            </div>
                        </TiltCard>

                        {/* Annual */}
                        <TiltCard>
                            <div className="bg-[#e0a458] p-10 rounded-[2.5rem] border-4 border-white/20 shadow-2xl relative text-[#2c332e]">
                                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-white text-[#b37628] px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-lg">
                                    {t('marketing.best_value')}
                                </div>
                                <h3 className="text-xl font-bold mb-2 opacity-80">{t('marketing.annual')}</h3>
                                <div className="text-5xl font-serif font-bold mb-2">26.900 kr</div>
                                <div className="text-sm opacity-60 mb-6 font-medium">{t('marketing.for_year')}</div>

                                <div className="bg-white/40 rounded-2xl p-4 mb-8 font-bold text-sm flex items-center justify-center gap-2">
                                    <span className="text-xl">🎁</span> {t('marketing.get_3_months_free')}
                                </div>

                                <Button variant="primary" className="w-full bg-[#2c332e] text-white hover:bg-black shadow-xl shadow-[#2c332e]/20">
                                    {t('marketing.try_free_14_days')}
                                </Button>
                            </div>
                        </TiltCard>
                    </div>
                </div>
            </section>

            {/* FAQ - SEO Structured Data */}
            <section className="py-24" id="faq" style={{ backgroundColor: '#ffffff' }}>
                <div className="max-w-3xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold" style={{ color: '#2c332e' }}>{t('faq.title')}</h2>
                    </div>

                    <div className="space-y-2">
                        <FAQItem question={t('faq.q1')} answer={t('faq.a1')} />
                        <FAQItem question={t('faq.q2')} answer={t('faq.a2')} />
                        <FAQItem question={t('faq.q3')} answer={t('faq.a3')} />
                        <FAQItem question={t('faq.q4')} answer={t('faq.a4')} />
                        <FAQItem question={t('faq.q5')} answer={t('faq.a5')} />
                    </div>

                    {/* Hidden JSON-LD for SEO */}
                    <script type="application/ld+json" dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "FAQPage",
                            "mainEntity": [1, 2, 3, 4, 5].map(i => ({
                                "@type": "Question",
                                "name": t(`faq.q${i}`),
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": t(`faq.a${i}`)
                                }
                            }))
                        })
                    }} />
                </div>
            </section>

            {/* FOOTER */}
            <footer className="py-12 border-t border-stone-200" style={{ backgroundColor: '#ffffff', color: '#2c332e' }}>
                <div className="max-w-4xl mx-auto flex flex-col items-center gap-6">
                    <span className="font-serif text-3xl font-bold tracking-tight" style={{ color: '#2c332e' }}>FamilyLifeOS</span>
                    <div className="text-sm font-medium" style={{ color: '#57534e' }}>
                        {t('marketing.footer_rights')}
                    </div>
                    <div className="flex gap-4 text-xs font-bold uppercase tracking-widest cursor-pointer transition-colors" style={{ color: '#57534e' }}>
                        <span>Privacy Policy</span>
                        <span>Terms of Service</span>
                        <span>Contact</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
