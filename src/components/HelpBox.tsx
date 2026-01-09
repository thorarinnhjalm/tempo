import { Lightbulb } from 'lucide-react';
import { ReactNode } from 'react';

interface HelpBoxProps {
    title?: string;
    children: ReactNode;
    className?: string;
}

export function HelpBox({ title = "Vissir þú...?", children, className }: HelpBoxProps) {
    return (
        <div className={`flex gap-4 bg-indigo-50/80 border border-indigo-100 p-4 rounded-2xl ${className}`}>
            <div className="shrink-0">
                <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center">
                    <Lightbulb size={20} className="fill-indigo-600/20" />
                </div>
            </div>
            <div>
                <h4 className="font-bold text-indigo-900 text-sm uppercase tracking-wide mb-1">{title}</h4>
                <div className="text-indigo-800/80 text-sm font-medium leading-relaxed">
                    {children}
                </div>
            </div>
        </div>
    );
}
