import { motion, HTMLMotionProps } from 'framer-motion';
import { clsx } from 'clsx';
import { ReactNode } from 'react';

interface ButtonProps extends HTMLMotionProps<"button"> {
    children: ReactNode;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export function Button({
    children,
    variant = 'primary',
    size = 'md',
    className,
    ...props
}: ButtonProps) {

    const variants = {
        primary: "bg-[#2d4a3e] text-white shadow-lg shadow-[#2d4a3e]/20 hover:bg-[#3d6152] border-2 border-transparent",
        secondary: "bg-[#d97757] text-white shadow-lg shadow-[#d97757]/20 hover:bg-[#c06548] border-2 border-transparent",
        outline: "bg-transparent text-[#2d4a3e] border-2 border-[#2d4a3e]/10 hover:bg-[#2d4a3e]/5",
        ghost: "bg-transparent text-[#2d4a3e] hover:bg-[#2d4a3e]/5 border-2 border-transparent",
    };

    const sizes = {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg",
    };

    return (
        <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.95, y: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className={clsx(
                "rounded-full font-bold flex items-center justify-center gap-2 transition-colors relative overflow-hidden",
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        >
            <span className="relative z-10 flex items-center gap-2">{children}</span>
        </motion.button>
    );
}
