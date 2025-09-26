export default function HomePage() {
    return (
        <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
            <div className="max-w-3xl">
                <h1 className="text-5xl md:text-7xl font-bold">
                    Bienvenue chez <span className="text-secondary">Lux Tech</span> Services
                </h1>
                <p className="mt-4 text-lg text-gray-300">
                    Votre partenaire pour des solutions technologiques innovantes et sur mesure.
                    Nous transformons vos idées en réalité numérique.
                </p>
                <div className="mt-8 flex justify-center gap-4">
                    <a
                        href="/services"
                        className="bg-secondary text-white font-semibold px-6 py-3 rounded-lg hover:bg-red-700 transition-colors duration-300"
                    >
                        Découvrir nos services
                    </a>
                    <a
                        href="/contact"
                        className="bg-transparent border border-gray-400 text-white font-semibold px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors duration-300"
                    >
                        Nous contacter
                    </a>
                </div>
            </div>
        </main>
    );
}