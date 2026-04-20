import { useEffect, useMemo, useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useAuth } from "@/hooks/useAuth";
import {
  formatMoney, getPayments, Payment, seedDemoIfEmpty, toUSD, fromUSD,
} from "@/lib/storage";
import { TrendingUp, Wallet, Receipt, Sparkles, ArrowUpRight, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

type Member = { id: string; name: string; email: string; created_at: string };

export default function DashboardOverview() {
  const { user } = useAuth();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    if (!user) return;
    seedDemoIfEmpty(user.id);
    setPayments(getPayments(user.id));

    supabase
      .from("profiles")
      .select("id, name, email, created_at")
      .order("created_at", { ascending: false })
      .then(({ data }) => setMembers((data as Member[]) ?? []));
  }, [user]);

  const stats = useMemo(() => {
    const cur = user?.currency ?? "USD";
    const totalUSD = payments.reduce((sum, p) => sum + toUSD(p.amount, p.currency), 0);
    const total = fromUSD(totalUSD, cur);

    const now = new Date();
    const monthUSD = payments
      .filter((p) => {
        const d = new Date(p.date);
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
      })
      .reduce((s, p) => s + toUSD(p.amount, p.currency), 0);
    const month = fromUSD(monthUSD, cur);

    // Mocked tax: 18% of total income (simple slab placeholder)
    const taxUSD = totalUSD * 0.18;
    const tax = fromUSD(taxUSD, cur);

    return { total, month, tax, count: payments.length, currency: cur };
  }, [payments, user]);

  if (!user) return null;
  const recent = payments.slice(0, 5);

  return (
    <DashboardLayout>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-primary">Overview</div>
          <h1 className="mt-1 font-display text-3xl font-semibold md:text-4xl">
            Hello, {user.name.split(" ")[0]} 👋
          </h1>
          <p className="text-sm text-muted-foreground">Here's how your global income is shaping up.</p>
        </div>
        <Button asChild variant="hero">
          <Link to="/dashboard/payments">Add payment <ArrowUpRight className="h-4 w-4" /></Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Wallet} label="Total earnings" value={formatMoney(stats.total, stats.currency)} accent />
        <StatCard icon={TrendingUp} label="This month" value={formatMoney(stats.month, stats.currency)} />
        <StatCard icon={Receipt} label="Transactions" value={String(stats.count)} />
        <StatCard icon={Sparkles} label="Estimated tax (18%)" value={formatMoney(stats.tax, stats.currency)} />
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        <div className="glass rounded-2xl p-6 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold">Recent transactions</h2>
            <Link to="/dashboard/payments" className="text-xs text-primary hover:underline">View all</Link>
          </div>
          {recent.length === 0 ? (
            <div className="py-10 text-center text-sm text-muted-foreground">
              No payments yet. <Link to="/dashboard/payments" className="text-primary">Add your first one →</Link>
            </div>
          ) : (
            <ul className="divide-y divide-white/5">
              {recent.map((p) => (
                <li key={p.id} className="flex items-center justify-between py-3">
                  <div className="min-w-0">
                    <div className="truncate font-medium">{p.client}</div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(p.date).toLocaleDateString()} • {p.method}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-display font-semibold">{formatMoney(p.amount, p.currency)}</div>
                    <div className="text-xs text-muted-foreground">
                      ≈ {formatMoney(fromUSD(toUSD(p.amount, p.currency), stats.currency), stats.currency)}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="glass-strong relative overflow-hidden rounded-2xl p-6">
          <div aria-hidden className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-primary/40 to-secondary/40 blur-3xl" />
          <Sparkles className="h-6 w-6 text-primary" />
          <h3 className="mt-3 font-display text-lg font-semibold">AI tax insight</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Based on {stats.count} transaction{stats.count === 1 ? "" : "s"} totaling {formatMoney(stats.total, stats.currency)},
            your estimated yearly tax sits around <span className="text-foreground font-medium">{formatMoney(stats.tax, stats.currency)}</span>.
            Consider setting aside ~20% of every payment to stay ahead.
          </p>
          <Button asChild variant="glass" size="sm" className="mt-5">
            <Link to="/dashboard/assistant">Ask the assistant →</Link>
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}

function StatCard({
  icon: Icon, label, value, accent,
}: { icon: React.ComponentType<{ className?: string }>; label: string; value: string; accent?: boolean }) {
  return (
    <div className={`relative overflow-hidden rounded-2xl p-5 ${accent ? "glass-strong ring-1 ring-primary/20" : "glass"}`}>
      {accent && <div aria-hidden className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-primary/30 blur-3xl" />}
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Icon className="h-4 w-4 text-primary" />
        {label}
      </div>
      <div className="mt-3 font-display text-2xl font-semibold">{value}</div>
    </div>
  );
}
