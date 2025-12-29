import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase } from '../lib/supabaseClient';
import { ItemCard } from '../components/ItemCard';
import { Search } from 'lucide-react';

interface Item {
    id: number;
    title: string;
    price: number;
    category: string;
    image_url: string | null;
}

export default function Home() {
    const { t } = useTranslation();
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('All');

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        setLoading(true);
        const { data } = await supabase
            .from('items')
            .select('*')
            .eq('status', 'active')
            .order('created_at', { ascending: false });

        if (data) setItems(data);
        setLoading(false);
    };

    const filteredItems = items.filter(item => {
        // Since database categories are in English (e.g., 'Books'), we match against the 'key' or handle mapping
        // However, the UI filter button now displays translated text.
        // For simplicity, we keep internal state 'category' as English keys ('All', 'Books'...)
        // causing a mismatch if we setCategory to the translated string.
        // FIX: The buttons loop over keys, but display translated text.
        const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = category === 'All' || item.category === category;
        return matchesSearch && matchesCategory;
    });

    const categories = ['All', 'Books', 'Electronics', 'Fashion', 'Others'];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-16 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-4">
                        {t('home.title')}
                    </h1>
                    <p className="text-lg text-blue-100 max-w-2xl mx-auto">
                        {t('home.subtitle')}
                    </p>
                </div>
            </div>

            {/* Filters */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
                <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6 flex flex-col md:flex-row gap-4 items-center border border-slate-100">
                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder={t('home.searchPlaceholder')}
                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setCategory(cat)}
                                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${category === cat
                                    ? 'bg-blue-600 text-white shadow-md'
                                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                                    }`}
                            >
                                {t(`filters.${cat}`)}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {loading ? (
                    <div className="text-center py-20 text-slate-500">{t('home.loading')}</div>
                ) : filteredItems.length === 0 ? (
                    <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                        <h3 className="text-xl font-bold text-slate-700 mb-2">{t('home.noItems')}</h3>
                        <p className="text-slate-500">{t('home.tryAdjusting')}</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredItems.map(item => (
                            <ItemCard
                                key={item.id}
                                id={item.id}
                                title={item.title}
                                price={item.price}
                                imageUrl={item.image_url}
                                category={item.category}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
