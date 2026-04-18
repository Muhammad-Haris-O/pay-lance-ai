import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { useAuth } from "@/hooks/useAuth";

export function SiteHeader() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 inset-x-0 z-40">
      <div className="mx-auto mt-4 max-w-6xl px-4">
        <div className="glass flex items-center justify-between rounded-2xl px-4 py-2.5">
          <Logo />
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#how" className="hover:text-foreground transition-colors">How it works</a>
            <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
          </nav>
          <div className="flex items-center gap-2">
            {user ? (
              <Button variant="hero" size="sm" onClick={() => navigate("/dashboard")}>
                Open dashboard
              </Button>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild className="hidden sm:inline-flex">
                  <Link to="/login">Sign in</Link>
                </Button>
                <Button variant="hero" size="sm" asChild>
                  <Link to="/signup">Start free</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
