import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

interface ToastProps {
    message: string;
    isVisible: boolean;
    onClose: () => void;
}

export function Toast({ message, isVisible }: ToastProps) {
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.9 }}
                    onAnimationComplete={() => {
                        // Auto-close logic can be handled here or by parent timeout
                    }}
                    className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50"
                >
                    <div className="bg-ink text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 border border-white/10">
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-ink font-bold">
                            <Check size={14} strokeWidth={4} />
                        </div>
                        <span className="font-bold">{message}</span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
