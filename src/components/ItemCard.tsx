import { Link } from 'react-router-dom';

interface ItemCardProps {
    id: number;
    title: string;
    price: number;
    imageUrl: string | null;
    category: string;
}

export const ItemCard = ({ id, title, price, imageUrl, category }: ItemCardProps) => {
    return (
        <div className="group bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300">
            <div className="aspect-[4/3] bg-slate-100 relative overflow-hidden">
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400 bg-slate-50">
                        No Image
                    </div>
                )}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-slate-600 shadow-sm border border-white/50">
                    {category}
                </div>
            </div>

            <div className="p-4">
                <h3 className="font-bold text-slate-800 text-lg mb-1 truncate">{title}</h3>
                <div className="flex items-center justify-between mt-3">
                    <span className="text-blue-600 font-bold text-xl">RM {price.toFixed(2)}</span>
                    <Link
                        to={`/items/${id}`}
                        className="px-4 py-2 bg-slate-50 hover:bg-blue-50 text-slate-600 hover:text-blue-600 rounded-xl text-sm font-medium transition-colors"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};
