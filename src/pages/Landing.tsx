import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  ArrowRight, Globe2, Wallet, Brain, ShieldCheck, Sparkles, Zap,
  Receipt, MessageSquare, BarChart3, Check,
} from "lucide-react";
import heroImg from "@/assets/hero-paylance.jpg";

const features = [
  { icon: Wallet, title: "Multi-currency tracker", desc: "Log payments from any client across 8+ currencies and see normalized USD instantly." },
  { icon: Brain, title: "AI tax summaries", desc: "Get plain-English estimates for monthly and yearly tax based on your local rules." },
  { icon: MessageSquare, title: "Compliance assistant", desc: "Ask anything about freelancer compliance — invoicing, GST, FIRC, FEMA — and get answers." },
  { icon: BarChart3, title: "Earnings dashboard", desc: "One screen for total income, recent transactions, and what you might owe." },
  { icon: ShieldCheck, title: "Built for freelancers", desc: "Tailored for creators in India and SEA who deal with international clients daily." },
  { icon: Zap, title: "Lightning quick", desc: "Add a payment in under 10 seconds. Your data stays on your device until you say otherwise." },
];

const steps = [
  { n: "01", title: "Create your account", desc: "Sign up in seconds with your country and preferred currency." },
  { n: "02", title: "Log your payments", desc: "Add international invoices and receipts as they come in." },
  { n: "03", title: "Stay compliant", desc: "Let Paylance estimate your tax and answer compliance questions." },
];

const tiers = [
  {
    name: "Free", price: "$0", tag: "Forever", desc: "For freelancers just getting started.",
    features: ["Up to 25 payments / month", "Basic dashboard", "AI tax estimates", "Single currency view"],
    cta: "Start free", variant: "glass" as const,
  },
  {
    name: "Pro", price: "$9", tag: "/month", desc: "For working creators with global clients.",
    features: ["Unlimited payments", "All currencies + FX rates", "AI compliance assistant", "Monthly tax reports", "CSV export"],
    cta: "Go Pro", variant: "hero" as const, highlight: true,
  },
  {
    name: "Premium", price: "$24", tag: "/month", desc: "For agencies & power freelancers.",
    features: ["Everything in Pro", "Multi-client invoicing", "Priority compliance reviews", "Dedicated support", "Early features"],
    cta: "Get Premium", variant: "glass" as const,
  },
];

export default function Landing() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <SiteHeader />

      {/* Aurora background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 aurora-bg animate-aurora" />
        <div className="absolute inset-0 grid-bg" />
      </div>

      {/* HERO */}
      <section className="relative px-4 pt-36 pb-24 md:pt-44 md:pb-32">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="animate-fade-up">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-muted-foreground backdrop-blur">
                <Sparkles className="h-3 w-3 text-primary" />
                AI-powered for freelance creators
              </div>
              <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
                Get paid <span className="text-gradient">globally.</span>
                <br />
                Stay compliant <span className="text-gradient">locally.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg text-muted-foreground">
                Paylance AI is the payments tracker and tax assistant built for freelance creators in India and Southeast Asia working with clients around the world.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button asChild variant="hero" size="xl">
                  <Link to="/signup">Start free <ArrowRight className="ml-1 h-4 w-4" /></Link>
                </Button>
                <Button asChild variant="glass" size="xl">
                  <a href="#features">See how it works</a>
                </Button>
              </div>
              <div className="mt-8 flex items-center gap-6 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-primary" /> No credit card</span>
                <span className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-primary" /> Free forever plan</span>
                <span className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-primary" /> Local-first data</span>
              </div>
            </div>

            <div className="relative animate-fade-up [animation-delay:120ms]">
              <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-primary/30 to-secondary/30 blur-3xl animate-glow-pulse" />
              <div className="relative glass-strong overflow-hidden rounded-[2rem] p-2">
                <img
                  src={heroImg}
                  alt="Paylance AI dashboard with global currency tracking"
                  width={1536}
                  height={1024}
                  className="rounded-[1.6rem] animate-float"
                />
              </div>

              {/* Floating stat cards */}
              <div className="absolute -left-4 bottom-8 hidden md:block animate-fade-up [animation-delay:300ms]">
                <div className="glass rounded-2xl px-4 py-3">
                  <div className="text-xs text-muted-foreground">This month</div>
                  <div className="font-display text-2xl font-semibold text-gradient">$8,420</div>
                </div>
              </div>
              <div className="absolute -right-2 top-10 hidden md:block animate-fade-up [animation-delay:400ms]">
                <div className="glass rounded-2xl px-4 py-3">
                  <div className="text-xs text-muted-foreground">Tax estimate</div>
                  <div className="font-display text-xl font-semibold">~ ₹71,400</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LOGO STRIP / TRUST */}
      <section className="border-y border-white/5 bg-white/[0.02] py-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-12 gap-y-4 px-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          <span>Wise</span><span>•</span><span>PayPal</span><span>•</span><span>Stripe</span><span>•</span><span>Payoneer</span><span>•</span><span>Razorpay</span><span>•</span><span>Bank Transfer</span>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="px-4 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <div className="text-xs uppercase tracking-[0.25em] text-primary">Features</div>
            <h2 className="mt-3 font-display text-4xl font-semibold md:text-5xl">
              Everything a global freelancer needs.
            </h2>
            <p className="mt-4 text-muted-foreground">
              From the first invoice to year-end filing — Paylance keeps your money and your taxes in one calm place.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="glass group relative rounded-2xl p-6 transition-all hover:-translate-y-1 hover:border-primary/30"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 ring-1 ring-white/10">
                  <f.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="px-4 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <div className="text-xs uppercase tracking-[0.25em] text-primary">How it works</div>
            <h2 className="mt-3 font-display text-4xl font-semibold md:text-5xl">Three steps to financial calm.</h2>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {steps.map((s) => (
              <div key={s.n} className="glass relative overflow-hidden rounded-2xl p-7">
                <div className="font-display text-6xl font-semibold text-gradient/40 opacity-30">{s.n}</div>
                <h3 className="mt-2 font-display text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="px-4 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <div className="text-xs uppercase tracking-[0.25em] text-primary">Pricing</div>
            <h2 className="mt-3 font-display text-4xl font-semibold md:text-5xl">Simple plans, fair prices.</h2>
            <p className="mt-4 text-muted-foreground">Start free. Upgrade when your client list does.</p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {tiers.map((t) => (
              <div
                key={t.name}
                className={`relative rounded-3xl p-8 ${
                  t.highlight
                    ? "glass-strong border-primary/40 ring-1 ring-primary/30 shadow-[var(--shadow-glow)]"
                    : "glass"
                }`}
              >
                {t.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-primary to-secondary px-3 py-1 text-xs font-medium text-primary-foreground">
                    Most popular
                  </div>
                )}
                <div className="text-sm text-muted-foreground">{t.name}</div>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="font-display text-5xl font-semibold">{t.price}</span>
                  <span className="text-sm text-muted-foreground">{t.tag}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{t.desc}</p>
                <ul className="mt-6 space-y-3 text-sm">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild variant={t.variant} size="lg" className="mt-8 w-full">
                  <Link to="/signup">{t.cta}</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-32">
        <div className="mx-auto max-w-5xl">
          <div className="glass-strong relative overflow-hidden rounded-[2.5rem] p-10 md:p-16 text-center">
            <div aria-hidden className="absolute inset-0 -z-10 aurora-bg opacity-80" />
            <Globe2 className="mx-auto h-10 w-10 text-primary" />
            <h2 className="mt-4 font-display text-4xl font-semibold md:text-5xl">
              Your money, <span className="text-gradient">organized.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Join freelance creators using Paylance AI to track payments and stay tax-ready.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild variant="hero" size="xl">
                <Link to="/signup">Start for free <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
              <Button asChild variant="glass" size="xl">
                <Link to="/login">I already have an account</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/5 px-4 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row">
          <div className="flex items-center gap-2">
            <Receipt className="h-4 w-4 text-primary" />
            <span>© {new Date().getFullYear()} Paylance AI. Built for global creators.</span>
          </div>
          <div className="flex gap-6">
            <a href="#features" className="hover:text-foreground">Features</a>
            <a href="#pricing" className="hover:text-foreground">Pricing</a>
            <Link to="/login" className="hover:text-foreground">Sign in</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
