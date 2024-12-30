import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const spinnerVariants = cva(
  "animate-spin rounded-full border-4 border-border border-t-transparent",
  {
    variants: {
      size: {
        default: "h-8 w-8",
        xs: "h-4 w-4",
        sm: "h-6 w-6",
        lg: "h-10 w-10",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

interface LoadingSpinnerProps extends VariantProps<typeof spinnerVariants> {
  className?: string;
}

export function LoadingSpinner({ size, className }: LoadingSpinnerProps) {
  return (
    <div className="flex h-32 w-full items-center justify-center">
      <div className={cn(spinnerVariants({ size }), className)} />
    </div>
  );
}
