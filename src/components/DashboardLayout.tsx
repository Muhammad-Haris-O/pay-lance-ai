import { ReactNode } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, Receipt, Bot, LogOut, Globe } from "lucide-react";
import { Logo } from "@/components/Logo";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

const items = [
  { to: "/dashboard", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/dashboard/payments", label: "Payments", icon: Receipt },
  { to: "/dashboard/assistant", label: "AI Assistant", icon: Bot },
];

export function DashboardLayout({ children }: { children: ReactNode }) {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  return (
    <div className="relative min-h-screen">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 aurora-bg opacity-60" />

      <div className="mx-auto flex max-w-[1400px] gap-6 p-4 md:p-6">
        {/* Sidebar */}
        <aside className="glass sticky top-6 hidden h-[calc(100vh-3rem)] w-64 shrink-0 flex-col rounded-2xl p-4 md:flex">
          <div className="px-2 py-2">
            <Logo to="/dashboard" />
          </div>
          <nav className="mt-6 flex flex-col gap-1">
            {items.map((it) => (
              <NavLink
                key={it.to}
                to={it.to}
                end={it.end}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-primary/20 to-secondary/15 text-foreground ring-1 ring-primary/30"
                      : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                  }`
                }
              >
                <it.icon className="h-4 w-4" />
                {it.label}
              </NavLink>
            ))}
          </nav>

          <div className="mt-auto rounded-xl border border-white/5 bg-white/[0.02] p-3 text-xs">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Globe className="h-3.5 w-3.5" />
              {user?.country} • {user?.currency}
            </div>
            <div className="mt-2 truncate font-medium">{user?.name}</div>
            <div className="truncate text-muted-foreground">{user?.email}</div>
            <Button
              variant="glass"
              size="sm"
              className="mt-3 w-full"
              onClick={() => { logout(); nav("/"); }}
            >
              <LogOut className="h-4 w-4" /> Sign out
            </Button>
          </div>
        </aside>

        {/* Mobile top bar */}
        <div className="md:hidden">
          <div className="glass mb-4 flex items-center justify-between rounded-2xl p-3">
            <Logo to="/dashboard" />
            <Button variant="glass" size="sm" onClick={() => { logout(); nav("/"); }}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Main */}
        <main className="min-w-0 flex-1">
          {/* Mobile nav */}
          <div className="mb-4 flex gap-2 overflow-x-auto md:hidden">
            {items.map((it) => (
              <NavLink
                key={it.to}
                to={it.to}
                end={it.end}
                className={({ isActive }) =>
                  `flex shrink-0 items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-xs ${
                    isActive ? "bg-primary/20 text-foreground" : "text-muted-foreground"
                  }`
                }
              >
                <it.icon className="h-3.5 w-3.5" />
                {it.label}
              </NavLink>
            ))}
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
