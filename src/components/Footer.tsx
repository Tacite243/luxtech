import Link from 'next/link';
import { Twitter, Facebook, Instagram, Linkedin } from 'lucide-react';

const usefulLinks = [
  { name: 'Accueil', href: '/' },
  { name: 'À Propos', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Projets', href: '/projets' },
  { name: 'Boutique', href: '/store' }
];

const ourServices = [
  { name: 'Construction Moderne', href: '/services/1' },
  { name: 'Installations Électriques', href: '/services/2' },
  { name: 'Design Intérieur', href: '/services/3' },
  { name: 'Solutions Domotiques', href: '/services/4' },
  { name: 'Dépannage & Maintenance', href: '/services/6' },
  { name: 'Boutique', href: '/store' }
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1a1a1a] text-[#e5e7eb] pt-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-4 text-[#FFFFFF]">LuxTech Services</h3>
            <p className="mb-2">149 Av Nzangi butondo <br />Q/Kyeshero, Goma, RDC</p>
            <p className="mb-2"><strong>Phone:</strong> +243 997354382</p>
            <p className="mb-4"><strong>Email:</strong> info@luxtechservices.com</p>
            <div className="flex gap-3">
              <a href="#" className="bg-[#FFFFFF]/10 p-2 rounded-full hover:bg-[#FF0000] transition-colors"><Twitter size={18} /></a>
              <a href="#" className="bg-[#FFFFFF]/10 p-2 rounded-full hover:bg-[#FF0000] transition-colors"><Facebook size={18} /></a>
              <a href="#" className="bg-[#FFFFFF]/10 p-2 rounded-full hover:bg-[#FF0000] transition-colors"><Instagram size={18} /></a>
              <a href="#" className="bg-[#FFFFFF]/10 p-2 rounded-full hover:bg-[#FF0000] transition-colors"><Linkedin size={18} /></a>
            </div>
          </div>

          {/* Colonne 2: Liens utiles */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Menu</h4>
            <ul>
              {usefulLinks.map(link => (
                <li key={link.name} className="mb-2">
                  <Link href={link.href} className="hover:text-[#FF0000] transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 3: Nos Services */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Nos Services</h4>
            <ul>
              {ourServices.map(service => (
                <li key={service.name} className="mb-2">
                  <Link href={service.href} className="hover:text-[#FF0000] transition-colors">
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 4: Contact rapide */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Contactez-Nous</h4>
            <p>
              Pour toute question ou demande de devis, n&apos;hésitez pas à nous
              <Link href="/contact" className="hover:text-[#FF0000] transition-colors"><strong> contacter</strong></Link>.
              Nous sommes là pour vous aider à réaliser vos projets.
            </p>
          </div>

        </div>
      </div>

      {/* Barre de copyright */}
      <div className="mt-12 py-6 bg-[#000000]/50">
        <div className="container mx-auto px-6 text-center text-sm text-[#9ca3af]">
          <p>Designed by Professor</p>
          <p>&copy; Copyright {currentYear} <strong>LuxTech Services</strong>. Tous Droits Réservés</p>
        </div>
      </div>
    </footer>
  );
}