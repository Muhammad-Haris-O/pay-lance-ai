import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({ className, to = "/" }: { className?: string; to?: string }) {
  return (
    <Link to={to} className={cn("group inline-flex items-center gap-2", className)}>
      <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-secondary shadow-[0_0_24px_-6px_hsl(var(--primary))]">
        <Sparkles className="h-4 w-4 text-primary-foreground" />
        <span className="absolute inset-0 rounded-xl ring-1 ring-white/20" />
      </span>
      <span className="font-display text-lg font-semibold tracking-tight">
        Paylance <span className="text-gradient">AI</span>
      </span>
    </Link>
  );
}
