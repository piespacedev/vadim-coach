import { lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Panels from "./components/Panels";
import StickyNav from "./components/StickyNav";
import About from "./components/About";
import Programs from "./components/Programs";
import Results from "./components/Results";
import Reviews from "./components/Reviews";
import Faq from "./components/Faq";
import Contacts from "./components/Contacts";
import Footer from "./components/Footer";
import { images } from "./content/site";
import { useLang } from "./lib/i18n";

// Демо GlareCard открывается по адресу /?demo=glare.
// Ленивая загрузка: recharts уходит в отдельный чанк и не попадает
// в бандл лендинга.
const GlareCardsDemo = lazy(() => import("./components/demo/GlareCardsDemo"));

export default function App() {
  const { t } = useLang();
  const isDemo =
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).get("demo") === "glare";

  if (isDemo) {
    return (
      <Suspense fallback={<div className="min-h-screen bg-[#050505]" />}>
        <GlareCardsDemo />
      </Suspense>
    );
  }

  return (
    <>
      {/* ── Первый экран ─────────────────────────────── */}
      <div
        className="relative flex min-h-screen flex-col overflow-hidden"
        style={{
          backgroundImage: `url(${images.heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* затемнение поверх фона, чтобы текст читался на любом фото */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/35 via-black/10 to-black/45" />

        <Navbar />
        <Hero />

        {/* Фото спортсмена — мобильный и планшет */}
        <div className="relative z-0 px-5 lg:hidden">
          <img
            src={images.athlete}
            alt={t.hero.athleteAlt}
            className="animate-scale-in delay-800 mx-auto -mb-10 w-[92%] max-w-[320px] rounded-[28px] object-cover shadow-2xl ring-1 ring-white/25 sm:-mb-16 sm:max-w-[400px]"
          />
        </div>

        <Panels />

        {/* Фото спортсмена — десктоп */}
        <img
          src={images.athlete}
          alt={t.hero.athleteAlt}
          aria-hidden="true"
          className="animate-scale-in delay-700 pointer-events-none absolute z-0 hidden rounded-[32px] object-cover shadow-2xl ring-1 ring-white/25 lg:block"
          style={{
            width: "clamp(280px, 27vw, 460px)",
            height: "auto",
            bottom: "150px",
            right: "clamp(-70px, -3vw, -24px)",
          }}
        />
      </div>

      {/* ── Остальные секции ─────────────────────────── */}
      <About />
      <Programs />
      <Results />
      <Reviews />
      <Faq />
      <Contacts />
      <Footer />

      <StickyNav />
    </>
  );
}
