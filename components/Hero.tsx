export default function Hero() {
    return (
        <section className="bg-linear-to-br from-red-50 to-white py-16">
            <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <h1 className="text-6xl font-bold leading-none mb-6">
                        Découvrez les meilleurs restaurants
                    </h1>
                    <p className="text-2xl text-gray-600 mb-10">
                        Explorez une sélection exceptionnelle de restaurants Tunisiens et découvrez de nouvelles saveurs près de chez vous
                    </p>

                    <div className="flex items-center gap-8 text-sm">
                        <div className="flex items-center gap-3">
                            <div className="bg-black text-white text-xs px-3 py-1 rounded-xl">Android</div>
                            <div>
                                <p className="font-medium">Application bientôt disponible</p>
                                <p className="text-xs text-gray-500">Coming soon - Arrive bientôt</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative">
                    <img
                        // src="https://picsum.photos/id/1015/800/600"
                        src="/hero-image.png"
                        alt="KmandyFood Hero"
                        className="rounded-3xl shadow-2xl"
                    />
                </div>
            </div>
        </section>
    );
}