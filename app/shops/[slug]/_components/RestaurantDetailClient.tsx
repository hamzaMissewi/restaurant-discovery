"use client";

import { useState } from "react";
import { Star, MapPin, Phone, Heart } from "lucide-react";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Restaurant } from "@/types";


interface RestaurantDetailClientProps {
    restaurant: Restaurant;
}

export default function RestaurantDetailClient({ restaurant }: RestaurantDetailClientProps) {
    const [activeCategory, setActiveCategory] = useState(restaurant.categories[0] || "Tacos");
    const [liked, setLiked] = useState(false);

    const currentItems = restaurant.menu[activeCategory] || [];

    return (
        <>
            <Header />

            {/* Banner */}
            <div className="relative h-80">
                {/* <Image src={restaurant.banner} alt="banner" fill className="object-cover" /> */}
                <Image src={restaurant?.banner || restaurant.image} alt="banner" fill className="object-cover" />
                <div className="absolute inset-0 bg-linear-to-b from-black/30 to-black/70" />

                <div className="absolute bottom-0 left-0 right-0 p-6 max-w-7xl mx-auto">
                    <div className="flex items-center gap-4">
                        {/* <Image src={restaurant.logo} alt={restaurant.name} width={80} height={80} className="rounded-2xl border-4 border-white" /> */}
                        <Image src={restaurant.image} alt={restaurant.name} width={80} height={80} className="rounded-2xl border-4 border-white" style={{ width: 'auto', height: 'auto' }} />
                        <div>
                            <h1 className="text-white text-5xl font-bold">{restaurant.name}</h1>
                            <p className="text-white/90 flex items-center gap-2 mt-1">
                                <MapPin className="w-5 h-5" /> {restaurant.address}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur px-5 py-2 rounded-3xl flex items-center gap-2 text-sm font-medium">
                    <Phone className="w-5 h-5 text-purple-600" />
                    <a href={`tel:${restaurant.phone}`} className="text-purple-600">{restaurant.phone}</a>
                    <span className="text-purple-600">Appelez</span>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <p className="text-xl font-medium">{restaurant.welcome}</p>
                        <div className="flex items-center gap-3 mt-2">
                            <div className="flex items-center gap-1 bg-green-100 text-green-700 px-4 py-1 rounded-2xl">
                                <Star className="w-5 h-5 fill-current" /> {restaurant.rating}
                                <span className="text-xs">({restaurant.reviews})</span>
                            </div>
                            <button
                                onClick={() => setLiked(!liked)}
                                className="flex items-center gap-2 text-gray-600 hover:text-red-600"
                            >
                                <Heart className={`w-6 h-6 ${liked ? "fill-red-600 text-red-600" : ""}`} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Categories Tabs */}
                <Tabs defaultValue={activeCategory} className="w-full" onValueChange={setActiveCategory}>
                    <TabsList className="flex flex-wrap gap-2 bg-transparent p-0 h-auto">
                        {restaurant.categories.map((cat) => (
                            <TabsTrigger
                                key={cat}
                                value={cat}
                                className="data-[state=active]:bg-purple-600 data-[state=active]:text-white px-6 py-3 rounded-2xl text-sm font-medium"
                            >
                                {cat}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    <TabsContent value={activeCategory} className="mt-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {currentItems.map((item, i) => (
                                <div key={i} className="bg-white border rounded-3xl overflow-hidden flex gap-6 p-4 hover:shadow-xl transition group">
                                    <Image
                                        src={item.img}
                                        alt={item.name}
                                        width={140}
                                        height={140}
                                        className="rounded-2xl object-cover group-hover:scale-105 transition"
                                        style={{ width: 'auto', height: 'auto' }}
                                    />
                                    <div className="flex-1 flex flex-col justify-between py-1">
                                        <div>
                                            <h3 className="font-semibold text-xl">{item.name}</h3>
                                            <div className="flex items-center gap-2 text-sm mt-1">
                                                <span className="flex items-center gap-1">
                                                    <Star className="w-4 h-4 text-yellow-500" /> {item.rating}
                                                </span>
                                                <span className="text-gray-400">({item.reviews})</span>
                                            </div>
                                        </div>
                                        <div className="text-3xl font-bold text-purple-600">
                                            {item.price.toFixed(2)} <span className="text-base font-normal text-gray-500">TND</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>

                {/* Hours & Location */}
                <div className="mt-16 grid md:grid-cols-2 gap-10">
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Horaires d'ouverture</h2>
                        <p className="text-lg">{restaurant.hours}</p>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <MapPin /> Localisation
                        </h2>
                        <div className="bg-gray-100 h-80 rounded-3xl overflow-hidden">
                            <iframe
                                src={`https://maps.google.com/maps?q=${encodeURIComponent(restaurant.address)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title={`Map showing location of ${restaurant.name}`}
                                className="rounded-3xl"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}
