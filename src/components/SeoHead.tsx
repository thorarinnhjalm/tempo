import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface SeoHeadProps {
    title?: string;
    description?: string;
}

export function SeoHead({ title, description }: SeoHeadProps) {
    const { t, i18n } = useTranslation();

    const siteTitle = title || t('seo.title');
    const metaDescription = description || t('seo.description');
    const currentLang = i18n.language;

    useEffect(() => {
        // Update Title
        document.title = siteTitle;

        // Update Meta Tags
        const setMetaTag = (name: string, content: string) => {
            let element = document.querySelector(`meta[name="${name}"]`);
            if (!element) {
                element = document.createElement('meta');
                element.setAttribute('name', name);
                document.head.appendChild(element);
            }
            element.setAttribute('content', content);
        };

        const setOgTag = (property: string, content: string) => {
            let element = document.querySelector(`meta[property="${property}"]`);
            if (!element) {
                element = document.createElement('meta');
                element.setAttribute('property', property);
                document.head.appendChild(element);
            }
            element.setAttribute('content', content);
        };

        setMetaTag('description', metaDescription);
        setMetaTag('keywords', t('seo.keywords'));

        // Open Graph
        setOgTag('og:title', siteTitle);
        setOgTag('og:description', metaDescription);
        setOgTag('og:locale', currentLang === 'is' ? 'is_IS' : 'en_US');
        setOgTag('og:type', 'website');

        // Language Attribute on HTML tag
        document.documentElement.lang = currentLang;

    }, [siteTitle, metaDescription, currentLang, t]);

    return null; // Headless component
}
