import { Star, MapPin, Clock } from "lucide-react";
import Link from "next/link";

type Restaurant = {
    id: number;
    name: string;
    slug: string;
    category: string;
    rating: number;
    reviews: number;
    address: string;
    specialties: string[];
    image: string;
    time: string;
};

export default function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
    return (
        <div className="border rounded-3xl overflow-hidden hover:shadow-xl transition group">
            <Link href={`/shops/${restaurant.slug}`}>
                <img src={restaurant.image} alt={restaurant.name} className="w-full h-48 object-cover group-hover:scale-105 transition" />
            </Link>
            <div className="p-5">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="font-semibold text-xl">{restaurant.name}</h3>
                        <p className="text-red-600 text-sm">{restaurant.category}</p>
                    </div>
                    <div className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-2xl text-sm font-medium">
                        <Star className="w-4 h-4 fill-current" />
                        {restaurant.rating}
                    </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-500 my-4">
                    <MapPin className="w-4 h-4" />
                    <span className="line-clamp-1">{restaurant.address}</span>
                </div>

                <div className="flex flex-wrap gap-2">
                    {restaurant.specialties.map((s) => (
                        <span key={s} className="text-xs bg-gray-100 px-3 py-1 rounded-2xl">{s}</span>
                    ))}
                </div>

                <div className="flex items-center justify-between mt-6 text-sm">
                    <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {restaurant.time}
                    </div>
                    <span className="text-gray-400">{restaurant.reviews} avis</span>
                </div>
            </div>
        </div>
    );
}