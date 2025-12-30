import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";

type Logo = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

type LogoCloudProps = React.ComponentProps<"div"> & {
  logos: Logo[];
};

export function LogoCloud({ logos }: LogoCloudProps) {
  return (
    <div className="relative">
      <div className="flex items-center justify-center">
        <ProgressiveBlur
          className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16"
          direction="left"
          blurIntensity={1}
        />
        <InfiniteSlider gap={32} className="flex items-center">
          {logos.map((logo) => (
            <img
              key={logo.alt}
              src={logo.src}
              alt={logo.alt}
              width={logo.width ?? 120}
              height={logo.height ?? 40}
              className="h-8 w-auto opacity-70 grayscale transition-all hover:opacity-100 hover:grayscale-0"
            />
          ))}
        </InfiniteSlider>
        <ProgressiveBlur
          className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16"
          direction="right"
          blurIntensity={1}
        />
      </div>
    </div>
  );
}
