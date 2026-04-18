import { FormEvent, useEffect, useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useAuth } from "@/hooks/useAuth";
import {
  addPayment, CURRENCIES, deletePayment, formatMoney, fromUSD, getPayments,
  Payment, PAYMENT_METHODS, seedDemoIfEmpty, toUSD,
} from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function PaymentsPage() {
  const { user } = useAuth();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [open, setOpen] = useState(false);

  // Form state
  const [client, setClient] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState(user?.currency ?? "USD");
  const [method, setMethod] = useState("Wise");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [note, setNote] = useState("");

  useEffect(() => {
    if (!user) return;
    seedDemoIfEmpty(user.id);
    setPayments(getPayments(user.id));
  }, [user]);

  if (!user) return null;
  const userCur = user.currency;

  function reset() {
    setClient(""); setAmount(""); setMethod("Wise");
    setDate(new Date().toISOString().slice(0, 10)); setNote("");
  }

  function onAdd(e: FormEvent) {
    e.preventDefault();
    if (!user) return;
    const amt = parseFloat(amount);
    if (!client.trim() || !Number.isFinite(amt) || amt <= 0) {
      toast({ title: "Please fill in client and a valid amount.", variant: "destructive" });
      return;
    }
    addPayment(user.id, {
      client: client.trim(), amount: amt, currency, method,
      date: new Date(date).toISOString(), note: note.trim() || undefined,
    });
    setPayments(getPayments(user.id));
    toast({ title: "Payment added", description: `${client} • ${formatMoney(amt, currency)}` });
    reset(); setOpen(false);
  }

  function onDelete(id: string) {
    deletePayment(user!.id, id);
    setPayments(getPayments(user!.id));
  }

  const totalUSD = payments.reduce((s, p) => s + toUSD(p.amount, p.currency), 0);

  return (
    <DashboardLayout>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-primary">Payments</div>
          <h1 className="mt-1 font-display text-3xl font-semibold md:text-4xl">All transactions</h1>
          <p className="text-sm text-muted-foreground">
            {payments.length} payments • Total ≈ {formatMoney(fromUSD(totalUSD, userCur), userCur)}
          </p>
        </div>
        <Button variant="hero" onClick={() => setOpen((o) => !o)}>
          <Plus className="h-4 w-4" /> {open ? "Close form" : "Add payment"}
        </Button>
      </div>

      {open && (
        <form onSubmit={onAdd} className="glass-strong mb-6 rounded-2xl p-6 animate-fade-up">
          <h2 className="font-display text-lg font-semibold">New payment</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-1.5">
              <Label>Client</Label>
              <Input value={client} onChange={(e) => setClient(e.target.value)} placeholder="Acme Studio" required />
            </div>
            <div className="space-y-1.5">
              <Label>Amount</Label>
              <Input type="number" step="0.01" min="0" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="1500" required />
            </div>
            <div className="space-y-1.5">
              <Label>Currency</Label>
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {CURRENCIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Method</Label>
              <Select value={method} onValueChange={setMethod}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {PAYMENT_METHODS.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Date</Label>
              <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Note (optional)</Label>
              <Input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Project name…" />
            </div>
          </div>
          <div className="mt-5 flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={() => { setOpen(false); reset(); }}>Cancel</Button>
            <Button type="submit" variant="hero">Save payment</Button>
          </div>
        </form>
      )}

      <div className="glass overflow-hidden rounded-2xl">
        {payments.length === 0 ? (
          <div className="p-12 text-center text-sm text-muted-foreground">
            No payments yet. Click <span className="text-foreground">Add payment</span> to get started.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-white/5 text-left text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-5 py-3">Client</th>
                  <th className="px-5 py-3">Date</th>
                  <th className="px-5 py-3">Method</th>
                  <th className="px-5 py-3 text-right">Amount</th>
                  <th className="px-5 py-3 text-right">≈ {userCur}</th>
                  <th className="px-5 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {payments.map((p) => (
                  <tr key={p.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                    <td className="px-5 py-4">
                      <div className="font-medium">{p.client}</div>
                      {p.note && <div className="text-xs text-muted-foreground">{p.note}</div>}
                    </td>
                    <td className="px-5 py-4 text-muted-foreground">{new Date(p.date).toLocaleDateString()}</td>
                    <td className="px-5 py-4">
                      <span className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-1 text-xs">{p.method}</span>
                    </td>
                    <td className="px-5 py-4 text-right font-display font-semibold">{formatMoney(p.amount, p.currency)}</td>
                    <td className="px-5 py-4 text-right text-muted-foreground">
                      {formatMoney(fromUSD(toUSD(p.amount, p.currency), userCur), userCur)}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <Button variant="ghost" size="icon" onClick={() => onDelete(p.id)} aria-label="Delete payment">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
