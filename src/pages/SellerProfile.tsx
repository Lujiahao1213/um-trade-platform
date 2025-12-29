import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { ItemCard } from '../components/ItemCard';
import { User, Mail } from 'lucide-react';

interface SellerProfileType {
    username: string;
    email: string;
    avatar_url: string | null;
}

interface Item {
    id: number;
    title: string;
    price: number;
    category: string;
    image_url: string | null;
}

export default function SellerProfile() {
    const { t } = useTranslation();
    const { id } = useParams();
    const [seller, setSeller] = useState<SellerProfileType | null>(null);
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            fetchSellerData();
        }
    }, [id]);

    const fetchSellerData = async () => {
        setLoading(true);

        // Fetch Seller Profile
        const { data: profileData } = await supabase
            .from('profiles')
            .select('username, email, avatar_url')
            .eq('id', id)
            .single();

        if (profileData) {
            setSeller(profileData);
        }

        // Fetch Seller Items
        const { data: itemsData } = await supabase
            .from('items')
            .select('*')
            .eq('seller_id', id)
            .eq('status', 'active') // Only show active items
            .order('created_at', { ascending: false });

        if (itemsData) {
            setItems(itemsData);
        }

        setLoading(false);
    };

    if (loading) return <div className="text-center py-20 text-slate-500">{t('home.loading')}</div>;
    if (!seller) return <div className="text-center py-20 text-red-500">Seller not found.</div>;

    // Mask email for privacy (e.g., ja***@gmail.com)
    const maskedEmail = seller.email
        ? seller.email.replace(/(.{2})(.*)(@.*)/, '$1***$3')
        : 'Hidden Email';

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Header */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100 mb-12 flex flex-col items-center gap-6">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-slate-100 shadow-inner bg-slate-50 flex items-center justify-center">
                    {seller.avatar_url ? (
                        <img src={seller.avatar_url} alt={seller.username} className="w-full h-full object-cover" />
                    ) : (
                        <User className="w-12 h-12 text-slate-300" />
                    )}
                </div>

                <div className="text-center">
                    <h1 className="text-3xl font-extrabold text-slate-800 mb-1">@{seller.username || 'Unknown'}</h1>
                    <div className="flex items-center justify-center gap-2 text-slate-500">
                        <Mail className="w-4 h-4" />
                        <span>{maskedEmail}</span>
                    </div>
                </div>
            </div>

            {/* Items Grid */}
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Items for Sale ({items.length})</h2>

            {items.length === 0 ? (
                <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                    <p className="text-slate-500">{t('home.noItems')}</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {items.map(item => (
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
    );
}
