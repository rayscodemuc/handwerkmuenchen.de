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
        "inline-flex h-11 items-center justify-center gap-2 rounded-lg px-6 text-sm font-medium transition-all duration-200",
        "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 active:scale-[0.98]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        "w-auto [&_svg]:size-4 [&_svg]:shrink-0",
        className
      )}
    >
      {children}
    </button>
  );
}
