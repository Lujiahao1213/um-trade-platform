import { useTranslation } from 'react-i18next';

export const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    return (
        <select
            value={i18n.language}
            onChange={(e) => i18n.changeLanguage(e.target.value)}
            className="bg-white border border-slate-300 text-slate-700 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-1.5 cursor-pointer hover:border-blue-400 transition-colors outline-none"
        >
            <option value="en">English</option>
            <option value="zh">中文</option>
            <option value="ms">Bahasa Melayu</option>
        </select>
    );
};
