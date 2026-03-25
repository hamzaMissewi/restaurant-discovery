import { getRestaurantBySlug } from "@/data/restaurants";
import RestaurantDetailClient from "./_components/RestaurantDetailClient";
import { notFound } from "next/navigation";

export default async function RestaurantDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const restaurant = getRestaurantBySlug(slug);

    if (!restaurant) {
        notFound();
    }

    return <RestaurantDetailClient restaurant={restaurant} />;
}