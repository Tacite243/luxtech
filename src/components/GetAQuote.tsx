


export default function GetAQuote() {
  // Styles réutilisables pour les champs du formulaire avec couleurs en dur
  const inputStyle = "w-full px-4 py-3 bg-[#f9fafb] border border-[#d1d5db] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFC107] transition duration-300 text-gray-800";

  return (
    // Section principale avec un fond blanc (#FFFFFF) et texte gris foncé (#1f2937)
    <section className="bg-[#FFFFFF] text-[#1f2937] py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* --- Colonne de gauche : Contenu textuel --- */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Un projet en tête ? Simplifions ensemble sa réalisation.
            </h2>
            {/* Ligne d'accent avec la couleur jaune/or (#FFC107) */}
            <div className="w-20 h-1 bg-[#FFC107] mb-6" />
            {/* Paragraphes avec des nuances de gris spécifiques */}
            <p className="text-lg text-[#4b5563] mb-4">
              Notre objectif est de vous offrir un service fiable, efficace et durable. En nous faisant confiance, vous gagnez non seulement du temps, mais aussi la garantie d'un travail bien fait, avec un suivi attentif et une réelle valeur ajoutée.
            </p>
            <p className="text-[#6b7280]">
              Choisir LuxTech Services, c'est opter pour la fiabilité, l'innovation et la satisfaction. Remplissez le formulaire pour obtenir votre devis personnalisé.
            </p>
          </div>

          {/* --- Colonne de droite : Formulaire de contact --- */}
          {/* Conteneur du formulaire avec fond gris très clair (#f9fafb) */}
          <div className="bg-[#f9fafb] p-8 rounded-lg shadow-md border border-[#e5e7eb]">
            <h3 className="text-xl font-bold text-[#111827] mb-2 uppercase">
              Demander un devis gratuit
            </h3>
            <p className="text-[#6b7280] mb-6">
              Notre équipe vous répondra dans les plus brefs délais pour discuter de votre projet.
            </p>
            
            <form action="#" method="POST" className="space-y-5">
              <div>
                <input 
                  type="text" 
                  name="name"
                  placeholder="Votre Nom" 
                  required 
                  className={inputStyle} 
                />
              </div>
              <div>
                <input 
                  type="email"
                  name="email"
                  placeholder="Votre Email" 
                  required 
                  className={inputStyle} 
                />
              </div>
              <div>
                <input 
                  type="tel"
                  name="phone"
                  placeholder="Votre Téléphone (Optionnel)" 
                  className={inputStyle} 
                />
              </div>
              <div>
                <textarea 
                  name="message"
                  placeholder="Décrivez brièvement votre projet..." 
                  rows={5}
                  required
                  className={inputStyle}
                ></textarea>
              </div>
              <div>
                {/* Bouton avec fond jaune (#FFC107) et texte noir (#111827) */}
                <button 
                  type="submit" 
                  className="w-full bg-[#FFC107] text-[#111827] font-bold py-3 px-6 rounded-md hover:bg-[#eab308] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FFC107] transition-all duration-300"
                >
                  Envoyer la demande
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}