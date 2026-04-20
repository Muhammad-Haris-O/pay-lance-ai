import { createContext, useCallback, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Session, User as SupaUser } from "@supabase/supabase-js";

export type AppUser = {
  id: string;
  name: string;
  email: string;
  country?: string;
  currency?: string;
};

type SignupInput = { name: string; email: string; password: string; country?: string; currency?: string };

type AuthCtx = {
  user: AppUser | null;
  session: Session | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (input: SignupInput) => Promise<void>;
  logout: () => Promise<void>;
};

const Ctx = createContext<AuthCtx | null>(null);

function toAppUser(supaUser: SupaUser | null | undefined): AppUser | null {
  if (!supaUser) return null;
  const meta = (supaUser.user_metadata ?? {}) as Record<string, string>;
  return {
    id: supaUser.id,
    email: supaUser.email ?? "",
    name: meta.name || supaUser.email?.split("@")[0] || "Friend",
    country: meta.country,
    currency: meta.currency || "USD",
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set listener BEFORE checking existing session
    const { data: sub } = supabase.auth.onAuthStateChange((_event, sess) => {
      setSession(sess);
      setUser(toAppUser(sess?.user));
    });

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setUser(toAppUser(data.session?.user));
      setLoading(false);
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  }, []);

  const signup = useCallback(async (input: SignupInput) => {
    const redirectUrl = `${window.location.origin}/dashboard`;
    const { error } = await supabase.auth.signUp({
      email: input.email,
      password: input.password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          name: input.name,
          country: input.country ?? "",
          currency: input.currency ?? "USD",
        },
      },
    });
    if (error) throw error;
  }, []);

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
  }, []);

  const value = useMemo(
    () => ({ user, session, loading, login, signup, logout }),
    [user, session, loading, login, signup, logout],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAuth must be used within AuthProvider");
  return v;
}
