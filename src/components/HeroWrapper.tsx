"use client";

import { useEffect, useState } from "react";
import HeroStatic from "@/components/HeroStatic";
import HeroCarousel from "@/components/HeroCarousel";

export default function HeroWrapper() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // ⚠️ Pendant l’hydration → EXACTEMENT le même HTML que le serveur
  if (!mounted) {
    return <HeroStatic />;
  }

  // Après montage → remplacement propre
  return <HeroCarousel />;
}
