export default function Footer() {
    return (
        <footer className="bg-zinc-950 text-white/80 py-16">
            <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-10">
                <div>
                    {/* <h3 className="text-purple-500 text-2xl font-bold mb-4">Food Hub</h3> */}
                    <h3 className="text-purple-500 text-2xl font-bold mb-4">Hamza Kmandy Food</h3>
                    <p className="text-sm">La solution digitale complète qui transforme l’expérience client de votre établissement.</p>
                </div>

                <div>
                    <h4 className="font-semibold mb-4 text-white">Navigation</h4>
                    <ul className="space-y-2 text-sm">
                        <li><a href="/">Accueil</a></li>
                        <li><a href="/about">À propos</a></li>
                        <li><a href="/restaurant">Espace Restaurant</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-semibold mb-4 text-white">Fonctionnalités</h4>
                    <ul className="space-y-2 text-sm">
                        <li>Menu numérique</li>
                        <li>QR Code</li>
                        <li>Mise à jour temps réel</li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-semibold mb-4 text-white">Contact</h4>
                    <p>foodhub@foodhub.tn</p>
                    <p className="mt-6">@foodhub.tn</p>
                </div>
            </div>

            <div className="text-center text-xs text-white/50 mt-16 border-t border-white/10 pt-8">
                © 2026 Hamza Kmandy Food. Tous droits réservés. TN
            </div>
            {/* Fait avec ❤️ en Tunisie */}
        </footer>
    );
}

export function Footer0() {
    return (
        <footer className="bg-gray-900 text-white py-12">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <p className="text-3xl font-bold mb-2">FoodHub</p>
                <p className="text-sm text-gray-400">© 2026 Hamza Kmandy Food. Tous droits réservés.</p>
                {/* <p className="text-sm text-red-400 mt-1">Fait avec ❤️ en Tunisie</p> */}
            </div>
        </footer>
    );
}