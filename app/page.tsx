import { RetroGrid } from "./components/ui/bg-pattern";
import { Carousel } from "./components/carousel";

const slides = [
  { title: "Kabataan Deployment", src: "/images/kids_kabanata.jpg" },
  { title: "BoredCatzzz Gig", src: "/images/boredscat.jpg" },
  { title: "Palaro Atenista '25", src: "/images/tabletennis1.jpg" },
  { title: "CS Byte Banter", src: "/images/ByteBanter1.jpg" },
  { title: "Kabataan Deployment", src: "/images/daa1.jpg" },
  { title: "Battle of the Bands", src: "/images/ufest1.jpg" },
  { title: "U-Fest Parade", src: "/images/ufestparade.jpg" },
  { title: "Pride Month Parade", src: "/images/pride.JPG" },
  { title: "Battle of the Bands", src: "/images/botb2.jpg" },
  { title: "Jam in Faith", src: "/images/2.JPG" },
  { title: "CS Byte Banter", src: "/images/3.jpg" },
  { title: "Esporre Champion", src: "/images/esporre.JPG" },
  { title: "PSITS", src: "/images/psits.JPG" },
  { title: "Palaro Atenista '25", src: "/images/precious.jpg" },
  { title: "Palaro Esports '25", src: "/images/esports.jpg" },
];

export default function Page() {
  return (
    <div className="relative min-h-screen bg-[#faf8f3] text-[#52442C]">
      <RetroGrid angle={65} />

      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen gap-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-wide">
            Kiara's Photo Gallery
          </h1>
          <p className="mt-2 text-sm uppercase tracking-widest opacity-70">
            my second year adventures in ateneo through my lens
          </p>
        </div>

        <Carousel slides={slides} />
      </main>
    </div>
  );
}
