import Link from "next/link";
import Image from "next/image";
import { AnimatedButton } from "@/components/ui/animated-button";
import type { ProjectItem } from "@/lib/referenzen/types";
import { tradeLabels, objectTypeLabels } from "@/lib/referenzen/projects";
import { MapPin, FileCheck, Quote } from "lucide-react";

type ReferenzDetailProps = {
  project: ProjectItem;
};

export function ReferenzDetail({ project }: ReferenzDetailProps) {
  return (
    <article className="bg-[#FCFCFC]">
      <div className="container mx-auto px-4 py-12 lg:px-8 lg:py-16">
        {/* Header */}
        <header className="mx-auto max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-wider text-[#73628A]">
            Referenz
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#313D5A] md:text-4xl">
            {project.title}
          </h1>
          <p className="mt-3 flex items-center gap-2 text-[#73628A]">
            <MapPin className="h-4 w-4 shrink-0" />
            {project.location} · {objectTypeLabels[project.objectType]}
          </p>
          {project.year && (
            <p className="mt-1 text-sm text-[#73628A]">Jahr: {project.year}</p>
          )}
          <p className="mt-4 text-lg leading-relaxed text-[#313D5A]">
            {project.excerpt}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.trades.map((t) => (
              <span
                key={t}
                className="rounded-full border border-[#E5E7EB] bg-[#FFFFFF] px-3 py-1.5 text-sm font-medium text-[#313D5A]"
              >
                {tradeLabels[t]}
              </span>
            ))}
          </div>
        </header>

        {/* Metrics */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="mx-auto mt-10 max-w-3xl">
            <h2 className="text-lg font-semibold text-[#313D5A]">Kennzahlen</h2>
            <ul className="mt-3 flex flex-wrap gap-4">
              {project.metrics.map((m, i) => (
                <li
                  key={i}
                  className="rounded-lg border border-[#E5E7EB] bg-[#FFFFFF] px-4 py-3"
                >
                  <span className="text-sm text-[#73628A]">{m.label}</span>
                  <span className="ml-2 font-medium text-[#313D5A]">
                    {m.value}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Cover + Gallery */}
        <div className="mx-auto mt-10 max-w-4xl">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-[#E5E7EB] bg-[#FFFFFF]">
            <Image
              src={project.coverImage}
              alt=""
              fill
              className="object-cover"
              priority
              unoptimized
            />
          </div>
          {project.gallery && project.gallery.length > 0 && (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {project.gallery.map((src, i) => (
                <div
                  key={i}
                  className="relative aspect-[4/3] overflow-hidden rounded-lg border border-[#E5E7EB] bg-[#FCFCFC]"
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Scope */}
        {project.scope && project.scope.length > 0 && (
          <div className="mx-auto mt-12 max-w-3xl">
            <h2 className="text-lg font-semibold text-[#313D5A]">
              Leistungsumfang
            </h2>
            <ul className="mt-3 space-y-2">
              {project.scope.map((s, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-[#313D5A]"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#8AB0AB]" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Documentation */}
        {project.documentation && project.documentation.length > 0 && (
          <div className="mx-auto mt-10 max-w-3xl">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-[#313D5A]">
              <FileCheck className="h-5 w-5 text-[#73628A]" />
              Dokumentation
            </h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {project.documentation.map((d, i) => (
                <li
                  key={i}
                  className="rounded-lg border border-[#E5E7EB] bg-[#FFFFFF] px-3 py-2 text-sm text-[#313D5A]"
                >
                  {d}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Testimonial */}
        {project.testimonial && (
          <div className="mx-auto mt-12 max-w-3xl rounded-xl border border-[#E5E7EB] bg-[#FFFFFF] p-6 lg:p-8">
            <Quote className="h-10 w-10 text-[#73628A]/40" aria-hidden />
            <blockquote className="mt-3 text-[#313D5A] leading-relaxed">
              &ldquo;{project.testimonial.text}&rdquo;
            </blockquote>
            <footer className="mt-4 border-t border-[#E5E7EB] pt-3">
              <cite className="not-italic">
                <span className="font-medium text-[#313D5A]">
                  {project.testimonial.author}
                </span>
                {project.testimonial.source && (
                  <span className="text-sm text-[#73628A]">
                    {" "}
                    · {project.testimonial.source}
                  </span>
                )}
                {project.testimonial.date && (
                  <span className="text-sm text-[#73628A]">
                    {" "}
                    · {project.testimonial.date}
                  </span>
                )}
              </cite>
            </footer>
          </div>
        )}

        {/* CTA */}
        <div className="mx-auto mt-14 max-w-2xl rounded-2xl border border-[#E5E7EB] bg-[#26413C] p-8 text-center">
          <h2 className="text-xl font-bold text-white">
            Eigenes Projekt anfragen
          </h2>
          <p className="mt-2 text-sm text-white/80">
            München & Umgebung · Ein Ansprechpartner für alle Gewerke
          </p>
          <div className="mt-6">
            <Link href="/anfrage">
              <AnimatedButton className="bg-[#8AB0AB] text-[#26413C] hover:bg-[#8AB0AB]/90 border-0 px-8 py-5 text-base">
                Projekt anfragen
              </AnimatedButton>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
