import Image from "next/image";

export default function HeroStatic() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <Image
        src="/img/hero-carousel/hero-carousel-1.jpg"
        alt="LuxTech"
        fill
        priority
        sizes="100vw"
        className="object-cover"
        quality={70}
      />

      <div className="absolute inset-0 bg-black/70" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold">
          Transformez vos espaces <br />
          avec <span className="text-red-600">LuxTech</span>
        </h1>
      </div>
    </section>
  );
}
