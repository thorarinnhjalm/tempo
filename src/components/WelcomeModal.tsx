import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PartyPopper, Heart, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from './Button';
import confetti from 'canvas-confetti';

export function WelcomeModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState(0);

    useEffect(() => {
        const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
        if (!hasSeenWelcome) {
            // Small delay for better UX on load
            const timer = setTimeout(() => setIsOpen(true), 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        localStorage.setItem('hasSeenWelcome', 'true');
        confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.6 }
        });
    };

    const STEPS = [
        {
            icon: <PartyPopper size={48} className="text-yellow-500" />,
            title: "Velkomin í FamilyLifeOS!",
            description: "Hér er allt sem þú þarft til að halda utan um fjölskyldulífið á einum stað. Við erum spennt að fá þig í hópinn!",
            buttonText: "Áfram"
        },
        {
            icon: <Heart size={48} className="text-red-500" />,
            title: "Safnaðu minningum",
            description: "Skráðu skemmtileg augnablik í 'Minningar' (Vault) svo þau gleymist aldrei. Þú getur líka bætt við myndum og hljóðupptökum.",
            buttonText: "Sniðugt, hvað meira?"
        },
        {
            icon: <CheckCircle2 size={48} className="text-green-500" />,
            title: "Allt klárt!",
            description: "Nú ertu tilbúin(n) að byrja. Mundu að þú getur alltaf bætt við fleiri fjölskyldumeðlimum seinna.",
            buttonText: "Byrja núna"
        }
    ];

    const currentContent = STEPS[step];
    const isLastStep = step === STEPS.length - 1;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-md relative z-10 overflow-hidden"
                    >
                        {/* Progress Bar */}
                        <div className="h-2 bg-slate-100 flex">
                            {STEPS.map((_, i) => (
                                <div
                                    key={i}
                                    className={`flex-1 transition-colors duration-500 ${i <= step ? 'bg-indigo-500' : 'bg-transparent'}`}
                                />
                            ))}
                        </div>

                        <div className="p-8 md:p-10 text-center flex flex-col items-center">
                            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6 shadow-sm">
                                {currentContent.icon}
                            </div>

                            <motion.div
                                key={step}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="mb-8"
                            >
                                <h2 className="text-2xl font-black text-slate-800 mb-3 tracking-tight">
                                    {currentContent.title}
                                </h2>
                                <p className="text-slate-500 font-medium text-lg leading-relaxed">
                                    {currentContent.description}
                                </p>
                            </motion.div>

                            <Button
                                onClick={isLastStep ? handleClose : () => setStep(s => s + 1)}
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl shadow-xl shadow-indigo-200 text-lg flex items-center justify-center gap-2"
                            >
                                {currentContent.buttonText}
                                {!isLastStep && <ArrowRight size={20} />}
                            </Button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
