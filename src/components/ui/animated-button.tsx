import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export function AnimatedButton({ children, className, ...props }: AnimatedButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        "group relative flex h-12 items-center justify-center gap-2 overflow-hidden rounded-full border border-foreground/20 bg-background px-6 text-foreground transition-all duration-300",
        // Hover effects only on devices with hover capability (no touch)
        "@media(hover:hover){hover:bg-foreground hover:text-background}",
        className
      )}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </button>
  );
}
