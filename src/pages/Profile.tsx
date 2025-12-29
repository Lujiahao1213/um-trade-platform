import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../contexts/AuthProvider';
import { ItemCard } from '../components/ItemCard';
import { Trash2, Camera, User } from 'lucide-react';

interface Item {
    id: number;
    title: string;
    price: number;
    category: string;
    image_url: string | null;
}

export default function Profile() {
    const { t } = useTranslation();
    const { user } = useAuth();
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploadingAvatar, setUploadingAvatar] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

    useEffect(() => {
        if (user) {
            setAvatarUrl(user.user_metadata?.avatar_url);
            fetchUserItems();
        }
    }, [user]);

    const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!user) return; // Guard clause for TypeScript
        try {
            setUploadingAvatar(true);
            if (!event.target.files || event.target.files.length === 0) {
                throw new Error('You must select an image to upload.');
            }

            const file = event.target.files[0];
            const fileExt = file.name.split('.').pop();
            const fileName = `${user?.id}-${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('avatars')
                .upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }

            const { data: { publicUrl } } = supabase.storage
                .from('avatars')
                .getPublicUrl(filePath);

            const { error: updateError } = await supabase.auth.updateUser({
                data: { avatar_url: publicUrl }
            });

            if (updateError) throw updateError;

            // CRITICAL: Sync with public profiles table
            const { error: profileError } = await supabase
                .from('profiles')
                .upsert({
                    id: user.id,
                    email: user.email,
                    avatar_url: publicUrl,
                    // We preserve existing fields if possible, but upsert needs constraint key.
                    // 'updated_at': new Date() // in a real app
                });

            if (profileError) console.error('Profile sync error:', profileError);

            setAvatarUrl(publicUrl);
            alert('Avatar updated!');
            window.location.reload(); // Refresh to ensure Navbar updates too
        } catch (error) {
            alert('Error updating avatar!');
            console.error(error);
        } finally {
            setUploadingAvatar(false);
        }
    };

    const fetchUserItems = async () => {
        setLoading(true);
        if (!user) return;

        const { data } = await supabase
            .from('items')
            .select('*')
            .eq('seller_id', user.id)
            .order('created_at', { ascending: false });

        if (data) setItems(data);
        setLoading(false);
    };

    const handleDelete = async (id: number) => {
        if (window.confirm(t('profile.confirmDelete'))) {
            const { error } = await supabase
                .from('items')
                .delete()
                .eq('id', id);

            if (error) {
                alert('Failed to delete item');
            } else {
                fetchUserItems();
            }
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100 mb-12 flex flex-col items-center sm:flex-row sm:items-center gap-8">

                {/* Avatar Section */}
                <div className="relative group">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-slate-100 shadow-inner bg-slate-50 flex items-center justify-center">
                        {avatarUrl ? (
                            <img src={avatarUrl} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <User className="w-12 h-12 text-slate-300" />
                        )}
                    </div>

                    <label className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full shadow-lg cursor-pointer hover:bg-blue-700 transition-all border-2 border-white">
                        <Camera className="w-4 h-4" />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleAvatarUpload}
                            disabled={uploadingAvatar}
                            className="hidden"
                        />
                    </label>
                </div>

                <div className="text-center sm:text-left">
                    <h1 className="text-3xl font-extrabold text-slate-800 mb-2">{t('profile.title')}</h1>
                    <div className="text-slate-600">
                        <span className="font-semibold text-slate-700">Email:</span> {user?.email}
                    </div>
                </div>
            </div>

            <h2 className="text-2xl font-bold text-slate-800 mb-6">{t('profile.myListings')}</h2>

            {loading ? (
                <div className="text-center py-12 text-slate-500">{t('home.loading')}</div>
            ) : items.length === 0 ? (
                <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                    <p className="text-slate-500">{t('profile.noListings')}</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {items.map(item => (
                        <div key={item.id} className="relative group">
                            <ItemCard
                                id={item.id}
                                title={item.title}
                                price={item.price}
                                imageUrl={item.image_url}
                                category={item.category}
                            />
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleDelete(item.id);
                                }}
                                className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all hover:bg-red-700 z-10"
                                title={t('profile.delete')}
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
