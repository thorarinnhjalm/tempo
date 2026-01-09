import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
    const { i18n } = useTranslation();

    const toggleLanguage = () => {
        const newLang = i18n.language === 'is' ? 'en' : 'is';
        i18n.changeLanguage(newLang);
    };

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/10 text-ink text-sm font-bold transition-colors"
        >
            <Globe size={16} className="text-forest" />
            <span className="w-5 text-center">{i18n.language === 'is' ? 'IS' : 'EN'}</span>
        </motion.button>
    );
}
