import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { getProjectBySlug, tradeLabels } from "@/lib/referenzen/projects";
import { ReferenzDetail } from "@/components/blocks/referenzen";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    return { title: "Referenz nicht gefunden" };
  }
  const tradesStr = project.trades.map((t) => tradeLabels[t]).join(", ");
  return buildMetadata({
    title: `${project.title} – Referenz | handwerkmuenchen.de`,
    description: `${project.excerpt} ${project.location}. ${tradesStr}.`,
    canonicalPath: `/meisterleistungen/${slug}`,
  });
}

export default async function ReferenzDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();
  return <ReferenzDetail project={project} />;
}
