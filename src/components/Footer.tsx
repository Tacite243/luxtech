const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-gray-400">
        <p>&copy; {currentYear} Lux Tech Services. Tous droits réservés.</p>
        <p className="text-sm mt-2">
          Conçu avec <span className="text-secondary">❤</span> pour l'innovation.
        </p>
        <p className="text-sm mt-2">designed by Professor</p>
      </div>
    </footer>
  );
};

export default Footer;