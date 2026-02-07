import { LogoCloud } from "@/components/ui/logo-cloud";

// Example partner/client logos - replace with actual client logos
const logos = [
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    alt: "Google",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    alt: "Amazon",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    alt: "Microsoft",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    alt: "Apple",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
    alt: "Netflix",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/e/e1/Logo_of_YouTube_%282015-2017%29.svg",
    alt: "YouTube",
  },
];

export function LogoCloudSection() {
  return (
    <section className="bg-muted/30 py-16 lg:py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-10">
          <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Vertraut von führenden Unternehmen
          </p>
          <h2 className="mt-2 text-2xl font-bold text-foreground lg:text-3xl">
            Unsere Partner & Kunden
          </h2>
        </div>
        <LogoCloud logos={logos} />
      </div>
    </section>
  );
}
