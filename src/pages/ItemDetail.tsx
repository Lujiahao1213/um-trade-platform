import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { Phone, User, Calendar } from 'lucide-react';

interface ItemDetailType {
    id: number;
    title: string;
    description: string;
    price: number;
    image_url: string | null;
    created_at: string;
    category: string;
    seller_id: string;
    seller?: {
        username: string;
        contact_info: string;
    }
}

export default function ItemDetail() {
    const { t } = useTranslation();
    const { id } = useParams();
    const [item, setItem] = useState<ItemDetailType | null>(null);
    const [loading, setLoading] = useState(true);
    const [revealContact, setRevealContact] = useState(false);

    useEffect(() => {
        const fetchItem = async () => {
            if (!id) return;
            const { data: itemData } = await supabase
                .from('items')
                .select('*')
                .eq('id', id)
                .single();

            if (itemData) {
                const { data: userData } = await supabase
                    .from('profiles')
                    .select('username, contact_info')
                    .eq('id', itemData.seller_id)
                    .single();

                setItem({ ...itemData, seller: userData });
            }
            setLoading(false);
        };

        fetchItem();
    }, [id]);

    if (loading) return <div className="p-12 text-center text-slate-500">Loading details...</div>;
    if (!item) return <div className="p-12 text-center text-red-500">Item not found.</div>;

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Image Section */}
                <div className="bg-slate-100 rounded-3xl overflow-hidden aspect-square flex items-center justify-center border border-slate-200">
                    {item.image_url ? (
                        <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                    ) : (
                        <span className="text-slate-400">No Image Available</span>
                    )}
                </div>

                {/* Info Section */}
                <div className="space-y-6">
                    <div>
                        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-3">
                            {item.category}
                        </span>
                        <h1 className="text-4xl font-extrabold text-slate-900 mb-2">{item.title}</h1>
                        <p className="text-3xl font-bold text-blue-600">RM {item.price.toFixed(2)}</p>
                    </div>

                    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                        <h3 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                            <User className="w-4 h-4" />
                            Seller Info
                        </h3>
                        <p className="text-slate-600 mb-1">
                            @{item.seller?.username || 'Unknown User'}
                        </p>
                        <p className="text-xs text-slate-400 flex items-center gap-1 mb-3">
                            <Calendar className="w-3 h-3" />
                            Listed on {new Date(item.created_at).toLocaleDateString()}
                        </p>
                        <a
                            href={`/seller/${item.seller_id}`}
                            className="block w-full py-2 text-center border border-blue-600 text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors"
                        >
                            Visit Shop
                        </a>
                    </div>

                    <div className="prose prose-slate">
                        <h3 className="text-lg font-semibold text-slate-800">{t('item.description')}</h3>
                        <p className="text-slate-600 leading-relaxed whitespace-pre-line">{item.description || 'No description provided.'}</p>
                    </div>

                    <div className="pt-6 border-t border-slate-100">
                        {!revealContact ? (
                            <button
                                onClick={() => setRevealContact(true)}
                                className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                            >
                                <Phone className="w-5 h-5" />
                                Contact Seller
                            </button>
                        ) : (
                            <div className="p-4 bg-green-50 border border-green-200 rounded-xl text-center">
                                <p className="text-green-800 font-medium mb-1">Connect via WhatsApp / Phone</p>
                                <p className="text-2xl font-bold text-green-900 select-all">
                                    {item.seller?.contact_info || 'No contact info available'}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
