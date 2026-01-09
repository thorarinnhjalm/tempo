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
        primary: "bg-forest text-white shadow-lg shadow-forest/20 hover:bg-forest-light border-2 border-transparent",
        secondary: "bg-clay text-white shadow-lg shadow-clay/20 hover:bg-[#c06548] border-2 border-transparent",
        outline: "bg-transparent text-forest border-2 border-forest/10 hover:bg-forest/5",
        ghost: "bg-transparent text-forest hover:bg-forest/5 border-2 border-transparent",
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
