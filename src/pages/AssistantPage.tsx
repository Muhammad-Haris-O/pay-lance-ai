import { FormEvent, useEffect, useRef, useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, Send, Sparkles, User as UserIcon } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

type Msg = { role: "user" | "ai"; content: string };

const SUGGESTIONS = [
  "How much tax should I set aside this month?",
  "Do I need GST registration as an Indian freelancer with US clients?",
  "What's the difference between FIRC and FIRA documents?",
  "How can I lower my taxable income legally?",
];

function mockReply(q: string, country: string): string {
  const lower = q.toLowerCase();
  if (lower.includes("gst")) {
    return `For ${country}-based freelancers exporting services, GST registration is typically required only once your annual turnover crosses ₹20 lakh (₹10 lakh in special category states). Export of services is **zero-rated** under GST — you can supply via LUT without paying IGST. _This is general guidance, not legal advice._`;
  }
  if (lower.includes("firc") || lower.includes("fira")) {
    return `**FIRC** (Foreign Inward Remittance Certificate) and **FIRA** (Advice) are issued by your bank as proof that funds came in from abroad. Banks have largely moved to electronic FIRA. Keep these — they're often requested by your CA at year-end and during GST refunds.`;
  }
  if (lower.includes("tax") || lower.includes("set aside")) {
    return `A safe rule of thumb is to **set aside ~25–30%** of each international payment for taxes and contributions. Indian freelancers can usually opt into the **presumptive scheme (44ADA)** if turnover is under ₹75L, declaring 50% as profit — often a big saving versus regular slabs.`;
  }
  if (lower.includes("lower") || lower.includes("save") || lower.includes("reduce")) {
    return `Common levers: claim **Section 80C** (₹1.5L), **NPS 80CCD(1B)** (₹50K extra), health insurance under **80D**, business expenses (laptop, internet, software), and consider **44ADA presumptive taxation**. A short call with a CA usually pays for itself.`;
  }
  return `Great question. Based on your profile (${country}), I'd recommend keeping clean records of every invoice, FIRC/FIRA, and platform statement, and reviewing them quarterly. Want me to draft a checklist?`;
}

export default function AssistantPage() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Msg[]>([
    { role: "ai", content: `Hi ${user?.name?.split(" ")[0] ?? "there"} 👋 I'm Paylance, your compliance assistant. Ask me anything about international payments, taxes, or freelance accounting.` },
  ]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, thinking]);

  function send(text: string) {
    if (!text.trim()) return;
    setMessages((m) => [...m, { role: "user", content: text }]);
    setInput("");
    setThinking(true);
    setTimeout(() => {
      setMessages((m) => [...m, { role: "ai", content: mockReply(text, user?.country ?? "India") }]);
      setThinking(false);
    }, 700);
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    send(input);
  }

  return (
    <DashboardLayout>
      <div className="mb-6">
        <div className="text-xs uppercase tracking-[0.2em] text-primary">AI Assistant</div>
        <h1 className="mt-1 font-display text-3xl font-semibold md:text-4xl">Compliance, on demand</h1>
        <p className="text-sm text-muted-foreground">Ask anything about freelance payments, GST, tax slabs, and more.</p>
      </div>

      <div className="glass flex h-[calc(100vh-13rem)] flex-col rounded-2xl">
        <div className="flex-1 space-y-4 overflow-y-auto p-6">
          {messages.map((m, i) => (
            <div key={i} className={`flex gap-3 ${m.role === "user" ? "justify-end" : ""}`}>
              {m.role === "ai" && (
                <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-primary to-secondary">
                  <Bot className="h-4 w-4 text-primary-foreground" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  m.role === "user"
                    ? "bg-gradient-to-br from-primary/20 to-secondary/20 text-foreground ring-1 ring-primary/20"
                    : "bg-white/[0.04] text-foreground/90"
                }`}
              >
                {m.content.split(/(\*\*[^*]+\*\*|_[^_]+_)/g).map((part, j) => {
                  if (part.startsWith("**")) return <strong key={j}>{part.slice(2, -2)}</strong>;
                  if (part.startsWith("_")) return <em key={j} className="text-muted-foreground">{part.slice(1, -1)}</em>;
                  return <span key={j}>{part}</span>;
                })}
              </div>
              {m.role === "user" && (
                <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/10">
                  <UserIcon className="h-4 w-4" />
                </div>
              )}
            </div>
          ))}
          {thinking && (
            <div className="flex items-center gap-3">
              <div className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-primary to-secondary">
                <Sparkles className="h-4 w-4 animate-glow-pulse text-primary-foreground" />
              </div>
              <div className="rounded-2xl bg-white/[0.04] px-4 py-3 text-sm text-muted-foreground">
                Thinking…
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        {messages.length <= 1 && (
          <div className="border-t border-white/5 p-4">
            <div className="mb-2 text-xs text-muted-foreground">Try one of these:</div>
            <div className="flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-muted-foreground transition hover:border-primary/30 hover:text-foreground"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        <form onSubmit={onSubmit} className="flex gap-2 border-t border-white/5 p-4">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about taxes, GST, FIRC, invoicing…"
            className="flex-1"
          />
          <Button type="submit" variant="hero" size="default" disabled={thinking || !input.trim()}>
            <Send className="h-4 w-4" /> Send
          </Button>
        </form>
      </div>
    </DashboardLayout>
  );
}
