import { motion } from 'framer-motion';

// Curated palette for the particles based on our themes
const THEME_PARTICLES: Record<string, string[]> = {
    indigo: ['#818cf8', '#c7d2fe', '#6366f1'],
    blue: ['#60a5fa', '#bfdbfe', '#3b82f6'],
    pink: ['#f472b6', '#fbcfe8', '#ec4899'],
    green: ['#4ade80', '#bbf7d0', '#22c55e'],
    emerald: ['#34d399', '#a7f3d0', '#10b981'],
    orange: ['#fb923c', '#fed7aa', '#f97316'],
    yellow: ['#facc15', '#fef08a', '#eab308'],
    purple: ['#a78bfa', '#ddd6fe', '#8b5cf6'],
    teal: ['#2dd4bf', '#99f6e4', '#14b8a6'],
    rose: ['#fb7185', '#fecdd3', '#f43f5e'],
    cyan: ['#22d3ee', '#a5f3fc', '#06b6d4'],
    red: ['#f87171', '#fecaca', '#ef4444'],
};

function Particle({ color }: { color: string }) {
    // Random initial positions and movements
    const startX = Math.random() * 100;
    const startY = Math.random() * 100;
    const size = Math.random() * 60 + 20; // 20px to 80px
    const duration = Math.random() * 20 + 10; // 10s to 30s float

    return (
        <motion.div
            className="absolute rounded-full pointer-events-none mix-blend-multiply filter blur-xl opacity-30"
            style={{
                backgroundColor: color,
                width: size,
                height: size,
                top: `${startY}%`,
                left: `${startX}%`,
            }}
            animate={{
                y: [0, -100, 0],
                x: [0, 50, 0],
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
                duration: duration,
                repeat: Infinity,
                ease: "easeInOut",
            }}
        />
    );
}

export function AmbientBackground({ themeName = 'indigo' }: { themeName?: string }) {
    // Get colors for current theme, fallback to indigo
    const colors = THEME_PARTICLES[themeName] || THEME_PARTICLES['indigo'];

    // Generate a fixed set of particles
    // We use a fixed count to keep performance high
    const particleCount = 15;

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            {/* Base Gradient Layer */}
            <div className="absolute inset-0 bg-paper opacity-90" />

            {/* Particles Layer */}
            {Array.from({ length: particleCount }).map((_, i) => (
                <Particle
                    key={i}
                    color={colors[i % colors.length]}
                />
            ))}

            {/* Noise Texture Overlay for "Paper" feel */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
            />
        </div>
    );
}
