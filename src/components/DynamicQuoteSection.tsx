"use client";

import dynamic from "next/dynamic";

const LoadingSpinner = () => <div className="h-64" />;

// L'import dynamique avec `ssr: false` est maintenant autorisé ici
const GetAQuote = dynamic(() => import("@/components/GetAQuote"), {
  loading: () => <LoadingSpinner />,
  ssr: false,
});

export default function DynamicQuoteSection() {
  return <GetAQuote />;
}
