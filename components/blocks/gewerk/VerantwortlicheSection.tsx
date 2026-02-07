import Link from "next/link";
import { User, Check } from "lucide-react";
import type { TeamSection } from "@/lib/leistungen/config";

type VerantwortlicheSectionProps = {
  teamSection: TeamSection;
};

export function VerantwortlicheSection({ teamSection }: VerantwortlicheSectionProps) {
  const { heading, subline, roles } = teamSection;
  if (!roles?.length) return null;
  return (
    <section className="bg-[#26413C] py-16" aria-labelledby="verantwortung-heading">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <h2 id="verantwortung-heading" className="text-2xl font-bold text-white md:text-3xl">
            {heading}
          </h2>
          <p className="mt-4 text-white/75 text-base sm:text-lg leading-relaxed">
            {subline}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {roles.map((role) => (
            <div
              key={role.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8 transition-colors hover:bg-white/[0.07] hover:border-white/15 relative"
            >
              {role.badge && (
                <span className="absolute top-4 right-4 rounded-md border border-white/10 bg-white/10 px-2.5 py-1 text-xs font-medium text-white/80">
                  {role.badge}
                </span>
              )}
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 shrink-0 rounded-full border border-white/10 bg-white/10 flex items-center justify-center">
                  <User className="h-6 w-6 text-white/60" aria-hidden />
                </div>
                <div className={`min-w-0 flex-1 ${role.badge ? "pr-16 sm:pr-0" : ""}`}>
                  <h3 className="text-lg font-semibold text-white">{role.title}</h3>
                  <p className="mt-2 text-white/75 text-sm leading-relaxed">{role.body}</p>
                  <ul className="mt-4 space-y-2">
                    {role.bullets.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-white/70">
                        <Check className="h-4 w-4 shrink-0 text-white/60" aria-hidden />
                        {item}
                      </li>
                    ))}
                  </ul>
                  {role.schnittstellenLinks && role.schnittstellenLinks.length > 0 && (
                    <p className="mt-4 text-sm text-white/70">
                      <span className="sr-only">Schnittstellen: </span>
                      {role.schnittstellenLinks.map((link, i) => (
                        <span key={link.href}>
                          {i > 0 && " · "}
                          <Link href={link.href} className="underline underline-offset-2 hover:text-white">
                            {link.label}
                          </Link>
                        </span>
                      ))}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
