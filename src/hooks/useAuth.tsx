import { createContext, useCallback, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { getSession, login as doLogin, logout as doLogout, signup as doSignup, User } from "@/lib/storage";

type AuthCtx = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  signup: (input: Omit<User, "id"> & { password: string }) => Promise<User>;
  logout: () => void;
};

const Ctx = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUser(getSession());
    setLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const u = doLogin(email, password);
    setUser(u);
    return u;
  }, []);

  const signup = useCallback(async (input: Omit<User, "id"> & { password: string }) => {
    const u = doSignup(input);
    setUser(u);
    return u;
  }, []);

  const logout = useCallback(() => {
    doLogout();
    setUser(null);
  }, []);

  const value = useMemo(() => ({ user, loading, login, signup, logout }), [user, loading, login, signup, logout]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAuth must be used within AuthProvider");
  return v;
}
