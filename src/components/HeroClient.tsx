import dynamic from "next/dynamic";
import { createPortal } from "react-dom";

const HeroCarousel = dynamic(() => import("@/components/HeroCarousel"), {
  ssr: false,
});

export default function HeroClient() {
  const slot =
    typeof document !== "undefined"
      ? document.getElementById("hero-client-slot")
      : null;

  if (!slot) return null;

  return createPortal(<HeroCarousel />, slot);
}
