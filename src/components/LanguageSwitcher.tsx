import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher: React.FC = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-full p-1 border border-white/20">
            <button
                onClick={() => changeLanguage('is')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${i18n.language === 'is'
                        ? 'bg-white text-indigo-900 shadow-sm'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
            >
                IS
            </button>
            <button
                onClick={() => changeLanguage('en')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${i18n.language === 'en'
                        ? 'bg-white text-indigo-900 shadow-sm'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
            >
                EN
            </button>
        </div>
    );
};

export default LanguageSwitcher;
