export default function Footer() {
    return (
        <footer className="w-full overflow-x-scroll bg-zinc-950 text-white/80 py-8 px-9">
            <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-4">
                <div>
                    {/* <h3 className="text-purple-500 text-2xl font-bold mb-4">TN Food Hub</h3> */}
                    <h3 className="text-2xl font-bold mb-4">TN Food Hub</h3>
                    <p className="text-sm">La solution digitale complète qui transforme l’expérience client de votre établissement.</p>
                </div>

                <div>
                    <h4 className="font-semibold mb-4 text-white">Navigation</h4>
                    <ul className="space-y-2 text-sm">
                        <li><a href="/">Accueil</a></li>
                        <li><a href="/about">À propos</a></li>
                        <li><a href="/restaurant">Espace Restaurant</a></li>
                        <li><a href="/shop">Shop</a></li>
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

                <div className="">
                    <h4 className="font-semibold mb-4 text-white text-sm">Contact</h4>
                    {/* <p>foodhub@foodhub.tn</p> */}
                    <p className="text-sm">contact@hamzamissaoui.dev | contact@hamzamissaoui.online</p>
                    {/* <p className="mt-6">@foodhub.tn</p> */}
                    <p className="mt-6 text-sm">https://www.hamzamissaoui.dev</p>
                </div>
            </div>

            <div className="text-center text-xs text-white/50 mt-16 border-t border-white/10 pt-8">
                {/* © 2026 TN Food Hub. Tous droits réservés. Fait avec ❤️ en Tunisie */}
                © 2026 TN Food Hub. Tous droits réservés. Créé par <a href="https://www.hamzamissaoui.dev" target="_blank" rel="noopener noreferrer"><span className="font-bold  tracking-widest text-blue-400">Hamza Missaoui</span></a>
            </div>
        </footer>
    );
}