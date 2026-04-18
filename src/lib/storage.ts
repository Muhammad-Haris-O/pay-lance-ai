// Lightweight localStorage helpers for the MVP (auth + payments).
// Designed so swapping to Lovable Cloud later is straightforward.

export type User = {
  id: string;
  name: string;
  email: string;
  country: string;
  currency: string;
};

export type Payment = {
  id: string;
  client: string;
  amount: number;
  currency: string;
  method: string;
  date: string; // ISO
  note?: string;
};

const USERS_KEY = "paylance.users";
const SESSION_KEY = "paylance.session";
const PAYMENTS_KEY = (uid: string) => `paylance.payments.${uid}`;

// FX rates relative to USD (mock, UI only).
export const FX_TO_USD: Record<string, number> = {
  USD: 1,
  EUR: 1.08,
  GBP: 1.27,
  INR: 0.012,
  SGD: 0.74,
  AUD: 0.66,
  CAD: 0.73,
  JPY: 0.0064,
};

export const CURRENCIES = Object.keys(FX_TO_USD);

export const COUNTRIES = [
  "India", "Singapore", "Indonesia", "Philippines", "Vietnam",
  "Malaysia", "Thailand", "United States", "United Kingdom", "Germany",
];

export const PAYMENT_METHODS = ["Wise", "PayPal", "Stripe", "Payoneer", "Bank Transfer", "Crypto"];

const uid = () => Math.random().toString(36).slice(2) + Date.now().toString(36);

type StoredUser = User & { password: string };

function readUsers(): StoredUser[] {
  try { return JSON.parse(localStorage.getItem(USERS_KEY) ?? "[]"); } catch { return []; }
}
function writeUsers(u: StoredUser[]) { localStorage.setItem(USERS_KEY, JSON.stringify(u)); }

export function signup(input: Omit<User, "id"> & { password: string }): User {
  const users = readUsers();
  if (users.some(u => u.email.toLowerCase() === input.email.toLowerCase())) {
    throw new Error("An account with that email already exists.");
  }
  const user: StoredUser = { ...input, id: uid() };
  users.push(user);
  writeUsers(users);
  localStorage.setItem(SESSION_KEY, user.id);
  const { password: _p, ...safe } = user;
  return safe;
}

export function login(email: string, password: string): User {
  const users = readUsers();
  const u = users.find(x => x.email.toLowerCase() === email.toLowerCase() && x.password === password);
  if (!u) throw new Error("Invalid email or password.");
  localStorage.setItem(SESSION_KEY, u.id);
  const { password: _p, ...safe } = u;
  return safe;
}

export function logout() { localStorage.removeItem(SESSION_KEY); }

export function getSession(): User | null {
  const id = localStorage.getItem(SESSION_KEY);
  if (!id) return null;
  const u = readUsers().find(x => x.id === id);
  if (!u) return null;
  const { password: _p, ...safe } = u;
  return safe;
}

export function getPayments(userId: string): Payment[] {
  try { return JSON.parse(localStorage.getItem(PAYMENTS_KEY(userId)) ?? "[]"); } catch { return []; }
}
export function savePayments(userId: string, list: Payment[]) {
  localStorage.setItem(PAYMENTS_KEY(userId), JSON.stringify(list));
}
export function addPayment(userId: string, p: Omit<Payment, "id">): Payment {
  const list = getPayments(userId);
  const created = { ...p, id: uid() };
  list.unshift(created);
  savePayments(userId, list);
  return created;
}
export function deletePayment(userId: string, id: string) {
  savePayments(userId, getPayments(userId).filter(p => p.id !== id));
}

export function toUSD(amount: number, currency: string) {
  const r = FX_TO_USD[currency] ?? 1;
  return amount * r;
}

export function fromUSD(amountUSD: number, currency: string) {
  const r = FX_TO_USD[currency] ?? 1;
  return amountUSD / r;
}

export function formatMoney(amount: number, currency: string) {
  try {
    return new Intl.NumberFormat("en-US", { style: "currency", currency, maximumFractionDigits: 2 }).format(amount);
  } catch {
    return `${amount.toFixed(2)} ${currency}`;
  }
}

// Mock seed for empty accounts so the dashboard isn't barren on first visit.
export function seedDemoIfEmpty(userId: string) {
  if (getPayments(userId).length) return;
  const now = new Date();
  const iso = (d: Date) => d.toISOString();
  const samples: Omit<Payment, "id">[] = [
    { client: "Lumen Studio", amount: 1800, currency: "USD", method: "Wise", date: iso(new Date(now.getFullYear(), now.getMonth(), 4)), note: "Brand identity" },
    { client: "Nordic Labs", amount: 1450, currency: "EUR", method: "Stripe", date: iso(new Date(now.getFullYear(), now.getMonth() - 1, 22)), note: "Landing page" },
    { client: "Hayato Inc", amount: 95000, currency: "JPY", method: "Payoneer", date: iso(new Date(now.getFullYear(), now.getMonth() - 1, 11)) },
    { client: "Aero Devs", amount: 980, currency: "GBP", method: "PayPal", date: iso(new Date(now.getFullYear(), now.getMonth() - 2, 19)), note: "Plugin work" },
    { client: "Saffron Co", amount: 65000, currency: "INR", method: "Bank Transfer", date: iso(new Date(now.getFullYear(), now.getMonth() - 2, 2)) },
  ];
  savePayments(userId, samples.map(s => ({ ...s, id: uid() })));
}
