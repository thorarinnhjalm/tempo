import { ReactNode, useState } from 'react';
import { HelpCircle, Info } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

interface TooltipProps {
    content: string | ReactNode;
    children?: ReactNode; // Optional trigger element. If not provided, defaults to Help icon.
    side?: 'top' | 'bottom' | 'left' | 'right';
}

export function Tooltip({ content, children, side = 'top' }: TooltipProps) {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div
            className="relative inline-flex items-center"
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
            onClick={() => setIsVisible(!isVisible)} // Mobile support
        >
            {children || (
                <button className="text-slate-400 hover:text-indigo-500 transition-colors p-1">
                    <HelpCircle size={16} />
                </button>
            )}

            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial={{ opacity: 0, y: 5, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 5, scale: 0.95 }}
                        className="absolute z-50 w-64 bg-slate-800 text-white text-sm font-medium p-3 rounded-xl shadow-xl border border-slate-700 pointer-events-none"
                        style={{
                            bottom: side === 'top' ? '100%' : 'auto',
                            top: side === 'bottom' ? '100%' : 'auto',
                            left: '50%',
                            translateX: '-50%',
                            marginBottom: side === 'top' ? '8px' : 0,
                            marginTop: side === 'bottom' ? '8px' : 0,
                        }}
                    >
                        <div className="flex gap-2">
                            <Info size={16} className="text-indigo-400 shrink-0 mt-0.5" />
                            <div className="leading-snug">{content}</div>
                        </div>

                        {/* Arrow */}
                        <div
                            className="absolute w-3 h-3 bg-slate-800 transform rotate-45 left-1/2 -translate-x-1/2 border-r border-b border-slate-700"
                            style={{
                                bottom: side === 'top' ? '-6px' : 'auto',
                                top: side === 'bottom' ? '-6px' : 'auto',
                                borderRight: side === 'top' ? '1px solid #334155' : 'none',
                                borderBottom: side === 'top' ? '1px solid #334155' : 'none',
                                borderLeft: side === 'bottom' ? '1px solid #334155' : 'none',
                                borderTop: side === 'bottom' ? '1px solid #334155' : 'none',
                            }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
