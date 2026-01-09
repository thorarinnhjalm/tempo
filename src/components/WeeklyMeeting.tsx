import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ArrowRight, MessageCircle, Utensils, Calendar as CalendarIcon, Wallet } from 'lucide-react';

// Wizard Steps
const STEPS = [
    { id: 'checkin', title: 'Hvernig líður öllum?', icon: <MessageCircle size={28} /> },
    { id: 'schedule', title: 'Skipulag vikunnar', icon: <CalendarIcon size={28} /> },
    { id: 'menu', title: 'Matseðill', icon: <Utensils size={28} /> },
    { id: 'finance', title: 'Vasapeningar', icon: <Wallet size={28} /> },
];

interface WeeklyMeetingProps {
    onClose: () => void;
}

export function WeeklyMeeting({ onClose }: WeeklyMeetingProps) {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);

    const currentStep = STEPS[currentStepIndex];
    const isLastStep = currentStepIndex === STEPS.length - 1;

    const handleNext = () => {
        if (isLastStep) {
            onClose(); // In real app, save meeting summary
        } else {
            setCurrentStepIndex(prev => prev + 1);
        }
    };

    return (
        <div className="fixed inset-0 bg-stone-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-paper w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >

                {/* HEADER */}
                <div className="bg-forest p-8 text-white flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                            {currentStep.icon}
                        </div>
                        <div>
                            <div className="text-white/60 text-sm font-bold uppercase tracking-wider">
                                Fjölskyldufundur • Skref {currentStepIndex + 1}/{STEPS.length}
                            </div>
                            <h2 className="text-2xl font-serif font-bold">{currentStep.title}</h2>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                        <X size={24} />
                    </button>
                </div>

                {/* BODY */}
                <div className="flex-1 p-8 overflow-y-auto min-h-[300px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="h-full flex flex-col"
                        >
                            {/* CONTENT SWITCHER */}
                            {currentStep.id === 'checkin' && (
                                <div className="space-y-6">
                                    <p className="text-lg text-stone-600 font-medium leading-relaxed">
                                        Byrjum á að taka stöðuna. Hver og einn fær orðið. Hvað gekk vel í vikunni? Hvað var erfitt?
                                    </p>
                                    <div className="grid grid-cols-2 gap-4">
                                        {/* Mock Feelings Selection */}
                                        {['😊', '😴', '😤', '🤩'].map(emoji => (
                                            <button key={emoji} className="bg-white p-6 rounded-3xl border-2 border-stone-100 hover:border-forest/30 text-4xl shadow-sm hover:shadow-md transition-all">
                                                {emoji}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {currentStep.id === 'schedule' && (
                                <div className="space-y-4">
                                    <p className="text-stone-600 mb-4">Er eitthvað sérstakt um helgina? Afmæli? Íþróttir?</p>
                                    <div className="bg-indigo-50 p-6 rounded-3xl border border-indigo-100">
                                        <div className="flex items-center gap-4 mb-4">
                                            <CalendarIcon className="text-indigo-600" />
                                            <span className="font-bold text-indigo-900">Viðburður</span>
                                        </div>
                                        <input type="text" placeholder="Skrá viðburð..." className="w-full bg-white p-4 rounded-xl border-none outline-none focus:ring-2 focus:ring-indigo-200" />
                                    </div>
                                </div>
                            )}

                            {currentStep.id === 'menu' && (
                                <div className="space-y-4">
                                    <p className="text-stone-600 mb-4">Hvað eigum við að borða í kvöldmatinn þessa viku?</p>
                                    {['Mánudagur', 'Þriðjudagur', 'Miðvikudagur'].map(day => (
                                        <div key={day} className="flex items-center gap-4 border-b border-stone-100 pb-2">
                                            <div className="w-24 font-bold text-stone-500">{day}</div>
                                            <input type="text" placeholder="Velja rétt..." className="flex-1 bg-transparent p-2 outline-none font-medium text-ink" />
                                        </div>
                                    ))}
                                </div>
                            )}

                            {currentStep.id === 'finance' && (
                                <div className="text-center space-y-6 py-8">
                                    <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                                        <Wallet size={40} />
                                    </div>
                                    <h3 className="text-2xl font-bold">Vasapeningar</h3>
                                    <p className="text-stone-600">Hafa allir klárað sín húsverk?</p>
                                    <button className="bg-emerald-500 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-emerald-200 hover:bg-emerald-600 transition-colors">
                                        Já, greiða út! 💸
                                    </button>
                                </div>
                            )}

                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* FOOTER */}
                <div className="p-6 border-t border-stone-100 bg-stone-50 flex justify-end">
                    <button
                        onClick={handleNext}
                        className="bg-forest text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-forest-light transition-all flex items-center gap-2 shadow-xl shadow-forest/20"
                    >
                        {isLastStep ? 'Klára fund' : 'Næsta skref'}
                        {!isLastStep && <ArrowRight size={20} />}
                        {isLastStep && <Check size={20} />}
                    </button>
                </div>

            </motion.div>
        </div>
    );
}
