import { useState, useRef, useEffect } from 'react';
import { Member, Memory } from '../types/firestore';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Camera, X, Check, Sparkles } from 'lucide-react';
import { clsx } from 'clsx';
import confetti from 'canvas-confetti';

interface CreateMemoryProps {
    members: Member[];
    currentUser: Member;
    onClose: () => void;
    onSave: (data: Partial<Memory>) => void;
}

export function CreateMemory({ members, currentUser, onClose, onSave }: CreateMemoryProps) {
    const [content, setContent] = useState('');
    const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>([currentUser.id]); // Auto-select self
    const [isRecording, setIsRecording] = useState(false);
    const [mood, setMood] = useState<'happy' | 'excited' | 'calm' | null>(null);

    // Speech Recognition Ref
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const recognitionRef = useRef<any>(null);

    useEffect(() => {
        // Initialize Speech Recognition if available
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = true;
            recognitionRef.current.interimResults = true;
            recognitionRef.current.lang = 'is-IS'; // Default to Icelandic

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            recognitionRef.current.onresult = (event: any) => {
                let finalTranscript = '';

                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    if (event.results[i].isFinal) {
                        finalTranscript += event.results[i][0].transcript;
                    }
                }

                if (finalTranscript) {
                    setContent(prev => prev + (prev ? ' ' : '') + finalTranscript);
                }
            };

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            recognitionRef.current.onerror = (event: any) => {
                console.error('Speech recognition error', event.error);
                setIsRecording(false);
            };

            recognitionRef.current.onend = () => {
                setIsRecording(false);
            }
        }
    }, []);

    const toggleRecording = () => {
        if (isRecording) {
            recognitionRef.current?.stop();
            setIsRecording(false);
        } else {
            recognitionRef.current?.start();
            setIsRecording(true);
        }
    };

    // PHOTO MOCK
    const [hasPhoto, setHasPhoto] = useState(false);

    const handleCameraClick = () => {
        // Simulate taking a photo by toggling state
        setHasPhoto(!hasPhoto);
    };

    const toggleMember = (id: string) => {
        setSelectedMemberIds(prev =>
            prev.includes(id)
                ? prev.filter(mid => mid !== id)
                : [...prev, id]
        );
    };

    const handleSave = () => {
        // 1. Trigger Confetti
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.8 },
            colors: ['#8B5CF6', '#F59E0B', '#EC4899', '#3B82F6']
        });

        // 2. Play Sound (Optional, browser blocks auto-audio often, but on user interaction it's fine)
        // const audio = new Audio('/pop.mp3');
        // audio.play();

        // 3. Save Data
        onSave({
            content,
            taggedMemberIds: selectedMemberIds,
            mood: mood || undefined
        });
    };

    // 6-Year-Old Standard: Big targets, visual feedback
    return (
        <div className="h-full flex flex-col bg-white rounded-t-3xl shadow-2xl overflow-hidden relative">
            {/* HEADER */}
            <div className="flex items-center justify-between p-6">
                <button onClick={onClose} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200">
                    <X size={24} className="text-slate-600" />
                </button>
                <h2 className="text-xl font-black text-slate-800 tracking-tight">New Memory</h2>
                <div className="w-10" /> {/* Spacer */}
            </div>

            <div className="flex-1 overflow-y-auto px-6 pb-24 space-y-8">

                {/* 1. CONTENT & VOICE INPUT */}
                <div className="space-y-3">
                    <label className="text-lg font-bold text-slate-700 ml-1">What happened?</label>
                    <div className="relative">
                        <textarea
                            className="w-full bg-indigo-50 rounded-3xl p-6 text-lg min-h-[140px] focus:ring-4 focus:ring-indigo-100 outline-none resize-none placeholder-indigo-300 font-medium"
                            placeholder="We went to..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                        {/* VOICE BUTTON */}
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={toggleRecording}
                            className={clsx(
                                "absolute bottom-4 right-4 p-4 rounded-full shadow-lg transition-colors flex items-center gap-2",
                                isRecording ? "bg-red-500 text-white animate-pulse shadow-red-200" : "bg-white text-indigo-600 shadow-indigo-100"
                            )}
                        >
                            <Mic size={24} />
                            {isRecording && <span className="text-sm font-bold">Listening...</span>}
                        </motion.button>
                    </div>
                </div>

                {/* 2. PHOTO PLACEHOLDER */}
                <div>
                    <button
                        onClick={handleCameraClick}
                        className={clsx(
                            "w-full h-32 border-4 border-dashed rounded-3xl flex flex-col items-center justify-center gap-2 transition-all relative overflow-hidden",
                            hasPhoto ? "border-indigo-500" : "border-slate-200 hover:bg-slate-50 hover:border-indigo-300"
                        )}
                    >
                        {hasPhoto ? (
                            <>
                                <img src="https://images.unsplash.com/photo-1596908905631-7fe2dd220d24?auto=format&fit=crop&q=80&w=800" className="absolute inset-0 w-full h-full object-cover opacity-80" alt="Mock" />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                    <Check size={40} className="text-white drop-shadow-md" />
                                </div>
                            </>
                        ) : (
                            <>
                                <Camera size={32} className="text-slate-400 group-hover:text-indigo-500" />
                                <span className="font-bold text-slate-400 group-hover:text-indigo-500">Add Photo</span>
                            </>
                        )}
                    </button>
                </div>

                {/* 3. TAGGING (WHO WAS THERE?) */}
                <div className="space-y-4">
                    <label className="text-lg font-bold text-slate-700 ml-1 flex items-center gap-2">
                        Who was there?
                    </label>
                    <div className="flex flex-wrap gap-4">
                        {members.map(member => {
                            const isSelected = selectedMemberIds.includes(member.id);
                            return (
                                <motion.button
                                    key={member.id}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => toggleMember(member.id)}
                                    className="relative group"
                                >
                                    <div className={clsx(
                                        "w-20 h-20 rounded-full flex items-center justify-center text-3xl transition-all border-4 shadow-sm",
                                        isSelected
                                            ? "border-green-500 bg-green-50 scale-105"
                                            : "border-white bg-slate-100 opacity-70 grayscale-[0.3]"
                                    )}>
                                        {member.avatarUrl}
                                    </div>
                                    <span className="text-xs font-bold text-slate-600 block mt-1 text-center">{member.name}</span>

                                    {/* Green Checkmark Badge */}
                                    <AnimatePresence>
                                        {isSelected && (
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                exit={{ scale: 0 }}
                                                className="absolute -top-1 -right-1 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center border-2 border-white shadow-md z-10"
                                            >
                                                <Check size={16} strokeWidth={4} />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.button>
                            );
                        })}
                    </div>
                </div>

                {/* 4. MOOD SELECTOR */}
                <div className="space-y-4">
                    <label className="text-lg font-bold text-slate-700 ml-1">How did it feel?</label>
                    <div className="flex gap-3">
                        {[
                            { id: 'happy', icon: '😄', label: 'Happy' },
                            { id: 'excited', icon: '🤩', label: 'Excited' },
                            { id: 'calm', icon: '😌', label: 'Calm' }
                        ].map((m) => (
                            <button
                                key={m.id}
                                onClick={() => setMood(m.id as any)}
                                className={clsx(
                                    "flex-1 p-3 rounded-2xl border-2 flex flex-col items-center gap-1 transition-all",
                                    mood === m.id
                                        ? "bg-yellow-50 border-yellow-400"
                                        : "bg-white border-transparent shadow-sm"
                                )}
                            >
                                <span className="text-3xl">{m.icon}</span>
                                <span className="text-xs font-bold text-slate-600">{m.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

            </div>

            {/* FOOTER ACTION */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white to-transparent pt-12">
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSave}
                    disabled={!content && !mood}
                    className="w-full btn-primary bg-indigo-600 text-white py-4 text-xl rounded-2xl font-black shadow-xl shadow-indigo-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:grayscale"
                >
                    <Sparkles />
                    Save Memory
                </motion.button>
            </div>
        </div>
    );
}
