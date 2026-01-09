import { ArrowRight, Shield, Sparkles, Check, Play, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../components/Button';
import { TiltCard } from '../components/TiltCard';
import { AmbientBackground } from '../components/AmbientBackground';

export function MarketingSite() {
    return (
        <div className="min-h-screen font-sans bg-paper selection:bg-clay selection:text-white overflow-x-hidden relative">

            {/* BACKGROUND BLOBS - Fixing "Too White" */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-emerald-100/40 rounded-full blur-[120px] mix-blend-multiply opacity-70" />
                <div className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] bg-mustard/10 rounded-full blur-[100px] mix-blend-multiply opacity-60" />
                <div className="absolute bottom-[-10%] right-[20%] w-[500px] h-[500px] bg-clay/5 rounded-full blur-[100px] mix-blend-multiply opacity-50" />
            </div>

            <AmbientBackground themeName="emerald" />

            {/* NAVIGATION */}
            <nav className="fixed top-0 w-full bg-paper/70 backdrop-blur-lg z-50 border-b border-stone-100/50 supports-[backdrop-filter]:bg-paper/40">
                <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">

                    {/* LOGO: Samveran */}
                    <div className="flex items-center gap-2">
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-sm">
                            {/* Abstract 'Hugging' Shapes */}
                            <motion.circle
                                initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1 }}
                                cx="15" cy="20" r="12" fill="#2d4a3e" className="mix-blend-multiply opacity-90"
                            />
                            <motion.circle
                                initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }}
                                cx="25" cy="20" r="12" fill="#d97757" className="mix-blend-multiply opacity-90"
                            />
                        </svg>
                        <span className="font-serif text-2xl font-bold tracking-tight text-ink">Samveran</span>
                    </div>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-8 font-medium text-forest-light">
                        <a href="#features" className="hover:text-forest transition-colors">Tólin</a>
                        <a href="#tracks" className="hover:text-forest transition-colors">Heimarnir</a>
                        <a href="#pricing" className="hover:text-forest transition-colors">Verð</a>
                    </div>

                    {/* CTA */}
                    <Button size="sm">Prófa frítt</Button>
                </div>
            </nav>

            {/* HERO SECTION */}
            <section className="pt-32 pb-20 px-6 relative">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

                    <div className="space-y-8 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-mustard/10 text-mustard font-bold text-sm tracking-wide uppercase border border-mustard/20"
                        >
                            <Star size={14} fill="currentColor" /> Leikur að læra
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                            className="text-5xl md:text-7xl font-bold leading-[1.1] text-ink font-serif"
                        >
                            Gerum uppeldið að <span className="text-clay italic relative">gæðastundum
                                <motion.span
                                    className="absolute bottom-1 left-0 w-full h-3 bg-clay/20 -z-10 rounded-full"
                                    initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ delay: 0.8, duration: 0.8 }}
                                />
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                            className="text-xl md:text-2xl text-stone-600 font-light leading-relaxed max-w-lg"
                        >
                            Stjórnstöð fyrir hamingju. Einföld leið til að halda utan um skipulagið og skapa dýrmætar minningar í leiðinni.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                            className="flex flex-col sm:flex-row gap-4"
                        >
                            <Button variant="secondary" size="lg">
                                Byrja ferðalagið <ArrowRight size={20} />
                            </Button>
                            <Button variant="outline" size="lg">
                                <Play size={20} /> Sjá hvernig þetta virkar
                            </Button>
                        </motion.div>
                    </div>

                    {/* HERO VISUAL: 3D Tilted App Screenshot */}
                    <div className="relative">
                        {/* Blob underlay */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-gradient-to-tr from-mustard/20 to-clay/20 rounded-full blur-[100px] -z-10 opacity-60"></div>

                        <TiltCard className="perspective-1000 rotate-y-12 rotate-x-6 hover:rotate-0 transition-transform duration-700">
                            <motion.div
                                initial={{ y: 50, opacity: 0, rotateY: -10 }}
                                animate={{ y: 0, opacity: 1, rotateY: 0 }}
                                transition={{ duration: 1, type: "spring" }}
                                className="relative z-10"
                            >
                                {/* Phone Chassis */}
                                <div className="border-[14px] border-ink rounded-[3.5rem] overflow-hidden shadow-2xl bg-white max-w-sm mx-auto">
                                    {/* App UI Header */}
                                    <div className="bg-forest px-8 py-10 text-white text-center pb-16 relative overflow-hidden">
                                        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                                        <div className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase mb-4 shadow-sm border border-white/10">
                                            Vikulegt Verkefni
                                        </div>
                                        <h3 className="font-serif text-3xl font-bold leading-tight drop-shadow-md">Skjálaus Kvöldstund</h3>
                                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-white p-2 rounded-2xl shadow-xl">
                                            <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center text-3xl">🌿</div>
                                        </div>
                                    </div>

                                    {/* App UI Body */}
                                    <div className="pt-12 p-6 space-y-4 bg-slate-50 min-h-[350px]">
                                        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
                                            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-2xl border-2 border-white shadow-sm">🦁</div>
                                            <div>
                                                <div className="font-bold text-ink">Jón var með!</div>
                                                <div className="text-xs text-slate-500 font-medium">✨ +500 XP</div>
                                            </div>
                                            <div className="ml-auto text-green-500"><Check size={20} /></div>
                                        </div>
                                        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 opacity-60">
                                            <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center text-2xl border-2 border-white shadow-sm">🦄</div>
                                            <div>
                                                <div className="font-bold text-ink">Anna tók þátt</div>
                                                <div className="text-xs text-slate-500">Beðið eftir staðfestingu</div>
                                            </div>
                                        </div>

                                        <div className="my-6 h-px bg-slate-200 w-full"></div>

                                        <div className="bg-forest/5 p-4 rounded-2xl border border-forest/10">
                                            <h4 className="font-bold text-forest text-sm mb-2">Tilgangur</h4>
                                            <p className="text-xs text-forest/70 leading-relaxed">
                                                Að styrkja tengslin í fjölskyldunni með því að leggja símana til hliðar í eina kvöldstund.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </TiltCard>
                    </div>

                </div>
            </section>

            {/* HYBRID VALUE PROP */}
            <section id="features" className="py-24 relative z-10">
                {/* Slanted colored background */}
                <div className="absolute inset-0 bg-stone-50 skew-y-3 -z-10 origin-top transform scale-[1.1]"></div>

                <div className="max-w-4xl mx-auto px-6 text-center mb-16 relative">
                    <h2 className="text-4xl md:text-5xl font-bold text-ink mb-6 font-serif">Tvö kerfi, eitt app</h2>
                    <p className="text-xl text-stone-600 leading-relaxed">Við sameinum praktíska nytjahkuti og skemmtilega leiki svo þið fáið það besta úr báðum heimum.</p>
                </div>

                <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8">
                    {/* Card 1: Family OS */}
                    <TiltCard>
                        <div className="bg-paper p-10 rounded-[2.5rem] border border-stone-100 shadow-xl shadow-stone-200/50 relative overflow-hidden group h-full">
                            <div className="absolute top-0 right-0 w-48 h-48 bg-forest/5 rounded-full -mr-16 -mt-16 group-hover:scale-125 transition-transform duration-700 ease-in-out"></div>

                            <div className="w-20 h-20 bg-forest text-white rounded-3xl flex items-center justify-center mb-8 shadow-2xl shadow-forest/20 rotate-3 group-hover:rotate-6 transition-transform">
                                <Shield size={40} strokeWidth={1.5} />
                            </div>

                            <h3 className="text-3xl font-bold mb-4 font-serif text-ink">Family OS</h3>
                            <p className="text-stone-600 mb-8 leading-relaxed text-lg">
                                Hjálpartæki fyrir daglega lífið. Hér finnurðu verkfæri til að halda utan um skjáreglur, vikufundi, húsverk og vasapeninga.
                            </p>

                            <ul className="space-y-4">
                                {['Vikulegir fundir', 'Skjáreglur', 'Verkefnaskipulag'].map(item => (
                                    <li key={item} className="flex items-center gap-3 font-bold text-forest text-lg">
                                        <div className="w-8 h-8 rounded-full bg-forest/10 flex items-center justify-center text-sm">✓</div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </TiltCard>

                    {/* Card 2: Memory Builder */}
                    <TiltCard>
                        <div className="bg-paper p-10 rounded-[2.5rem] border border-stone-100 shadow-xl shadow-stone-200/50 relative overflow-hidden group h-full">
                            <div className="absolute top-0 right-0 w-48 h-48 bg-mustard/10 rounded-full -mr-16 -mt-16 group-hover:scale-125 transition-transform duration-700 ease-in-out"></div>

                            <div className="w-20 h-20 bg-mustard text-white rounded-3xl flex items-center justify-center mb-8 shadow-2xl shadow-mustard/20 -rotate-3 group-hover:-rotate-6 transition-transform">
                                <Sparkles size={40} strokeWidth={1.5} />
                            </div>

                            <h3 className="text-3xl font-bold mb-4 font-serif text-ink">Memory Builder</h3>
                            <p className="text-stone-600 mb-8 leading-relaxed text-lg">
                                Þegar þið leysið verkefni saman breytist appið í minningabók. Geymdu myndir, hljóðupptökur og sögur sem annars gleymast.
                            </p>

                            <ul className="space-y-4">
                                {['Sjálfvirk dagbók', 'Hljóðupptökur fyrir börn', 'Tilfinningaskráning'].map(item => (
                                    <li key={item} className="flex items-center gap-3 font-bold text-mustard text-lg">
                                        <div className="w-8 h-8 rounded-full bg-mustard/10 flex items-center justify-center text-sm">✓</div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </TiltCard>
                </div>
            </section>

            {/* PRICING */}
            <section id="pricing" className="py-32 px-6 relative overflow-hidden">
                <div className="absolute bottom-0 w-full h-[80%] bg-forest rounded-t-[4rem] -z-20"></div>
                {/* Texture */}
                <div className="absolute bottom-0 w-full h-[80%] opacity-10 -z-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white font-serif">Einfalt verð.<br />Engin skuldbinding.</h2>
                    <p className="text-forest-100 text-xl mb-16 max-w-lg mx-auto">Fjárfesting í framtíð fjölskyldunnar kostar minna en ein bíóferð.</p>

                    <div className="grid md:grid-cols-2 gap-8 items-center">

                        {/* Monthly */}
                        <TiltCard>
                            <div className="bg-forest-light/20 backdrop-blur-md p-10 rounded-[2.5rem] border border-white/10 text-white hover:bg-white/10 transition-colors">
                                <h3 className="text-xl font-bold mb-2 opacity-80">Mánaðarlega</h3>
                                <div className="text-5xl font-serif font-bold mb-2">2.990 kr</div>
                                <div className="text-sm opacity-60 mb-8 font-medium">gjaldfært mánaðarlega</div>
                                <Button variant="outline" className="w-full border-white/30 text-white hover:bg-white/10">
                                    Velja mánuð
                                </Button>
                            </div>
                        </TiltCard>

                        {/* Annual */}
                        <TiltCard>
                            <div className="bg-mustard p-10 rounded-[2.5rem] border-4 border-white/20 shadow-2xl relative text-ink">
                                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-white text-mustard px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-lg">
                                    Mest virði
                                </div>
                                <h3 className="text-xl font-bold mb-2 opacity-80">Árskort</h3>
                                <div className="text-5xl font-serif font-bold mb-2">26.900 kr</div>
                                <div className="text-sm opacity-60 mb-6 font-medium">fyrir allt árið</div>

                                <div className="bg-white/40 rounded-2xl p-4 mb-8 font-bold text-sm flex items-center justify-center gap-2">
                                    <span className="text-xl">🎁</span> Fáðu 3 mánuði frítt
                                </div>

                                <Button variant="primary" className="w-full bg-ink text-white hover:bg-black shadow-xl shadow-ink/20">
                                    Prófa frítt í 14 daga
                                </Button>
                            </div>
                        </TiltCard>

                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="bg-forest-light py-12 px-6 text-white text-center relative z-20">
                <div className="max-w-4xl mx-auto flex flex-col items-center gap-6">
                    <span className="font-serif text-3xl font-bold tracking-tight">Samveran</span>
                    <div className="text-white/60 text-sm font-medium">
                        © 2024 Leikur að læra. Öll réttindi áskilin.
                    </div>
                </div>
            </footer>

        </div>
    );
}
