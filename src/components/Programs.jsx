import { ArrowUpRight, Check } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { GlareCard } from "@/components/ui/glare-cards";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

export default function Programs() {
  const { t } = useLang();
  const programs = t.programs;

  return (
    <section
      id="programs"
      className="scroll-mt-16 bg-[#0B0E10] px-5 py-20 sm:px-8 lg:px-10 lg:py-28"
    >
      <div className="mx-auto max-w-[1360px]">
        <SectionHead
          dark
          label={programs.label}
          title={programs.title}
          subtitle={programs.subtitle}
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:gap-5 xl:grid-cols-4">
          {programs.items.map((item, i) => (
            <Reveal key={i} delay={0.1 + i * 0.09}>
              <GlareCard
                tiltIntensity={8}
                glareColor="rgba(110, 231, 183, 0.28)"
                className="h-full rounded-2xl border-white/10 bg-white/[0.04] p-6 backdrop-blur-none hover:border-white/25 lg:p-7"
              >
                <div className="flex h-full flex-col">
                  <img
                    src={item.icon3d}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="h-16 w-16 shrink-0 object-contain drop-shadow-[0_8px_20px_rgba(0,0,0,0.6)]"
                  />

                  <h3
                    className="mt-6 font-display text-[19px] text-white lg:text-[21px]"
                    style={{ letterSpacing: "-0.04em", lineHeight: 1.1 }}
                  >
                    {item.title}
                  </h3>

                  <p
                    className="mt-3 font-body text-sm text-white/55 lg:text-base"
                    style={{ lineHeight: 1.45, letterSpacing: "-0.02em" }}
                  >
                    {item.desc}
                  </p>

                  <ul className="mt-6 space-y-2.5">
                    {item.points.map((point) => (
                      <li key={point} className="flex items-start gap-2.5">
                        <Check
                          size={15}
                          strokeWidth={2}
                          className="mt-1 shrink-0 text-emerald-400"
                        />
                        <span
                          className="font-body text-sm text-white/75"
                          style={{
                            lineHeight: 1.35,
                            letterSpacing: "-0.02em",
                          }}
                        >
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-8">
                    <p
                      className="font-display text-[22px] text-white lg:text-[26px]"
                      style={{ letterSpacing: "-0.05em", lineHeight: 1 }}
                    >
                      {item.price}
                    </p>
                    <p className="mt-1.5 font-body text-sm text-white/40">
                      {item.unit}
                    </p>

                    <a
                      href="#contacts"
                      className="mt-5 flex h-12 w-full items-center justify-center gap-1.5 rounded-md bg-white font-body text-sm font-medium text-black transition-colors duration-300 hover:bg-emerald-300"
                      style={{ letterSpacing: "-0.02em" }}
                    >
                      {programs.cta}
                      <ArrowUpRight size={17} strokeWidth={1.8} />
                    </a>
                  </div>
                </div>
              </GlareCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
