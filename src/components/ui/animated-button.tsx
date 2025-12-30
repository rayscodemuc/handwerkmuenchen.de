import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AnimatedButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function AnimatedButton({ children, className, onClick }: AnimatedButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative flex h-12 items-center justify-center gap-2 overflow-hidden rounded-full border border-foreground/20 bg-background px-6 text-foreground transition-all duration-300 hover:bg-foreground hover:text-background",
        className
      )}
    >
      <span className="relative z-10 transition-transform duration-300 group-hover:-translate-x-2">
        {children}
      </span>
      <ArrowRight className="relative z-10 h-5 w-5 opacity-0 transition-all duration-300 group-hover:opacity-100" />
    </button>
  );
}
