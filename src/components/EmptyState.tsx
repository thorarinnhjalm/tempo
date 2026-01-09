import { ReactNode } from 'react';
import { Button } from './Button';
import { motion } from 'framer-motion';

interface EmptyStateProps {
    icon?: ReactNode;
    title: string;
    description: string;
    action?: {
        label: string;
        onClick: () => void;
    };
    className?: string;
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`flex flex-col items-center text-center p-8 md:p-12 rounded-[2.5rem] border-2 border-dashed border-slate-200 bg-white/50 backdrop-blur-sm ${className}`}
        >
            <div className="w-24 h-24 mb-6 relative">
                {/* Decorative background blob */}
                <div className="absolute inset-0 bg-indigo-50 rounded-full blur-xl animate-pulse opacity-60"></div>
                <div className="relative z-10 w-full h-full flex items-center justify-center text-6xl select-none transform hover:scale-110 transition-transform duration-300 origin-center">
                    {icon || '✨'}
                </div>
            </div>

            <h3 className="text-2xl font-black text-slate-800 mb-3 tracking-tight">{title}</h3>
            <p className="text-slate-500 font-medium text-lg leading-relaxed max-w-md mx-auto mb-8">
                {description}
            </p>

            {action && (
                <Button
                    onClick={action.onClick}
                    className="shadow-xl shadow-indigo-200 hover:shadow-indigo-300 text-lg px-8 py-3 h-auto rounded-2xl bg-indigo-600 text-white font-bold"
                >
                    {action.label}
                </Button>
            )}
        </motion.div>
    );
}
