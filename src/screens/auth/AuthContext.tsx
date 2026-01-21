import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { clearTokens, getAccessToken, setAccessToken, setRefreshToken } from "@/services/tokenStore";
import { setOnUnauthorized } from "@/services/api";
import { authService } from "@/services/AuthService";


type AuthContextValue = {
  isBooting: boolean;
  isAuthed: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isBooting, setIsBooting] = useState(true);
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    // 401 yakalanınca buraya düşsün:
    setOnUnauthorized(() => {
      // fire-and-forget (ui thread bloklamasın)
      logout();
    });
  }, []);

  useEffect(() => {
    (async () => {
      const token = await getAccessToken();
      setIsAuthed(!!token);
      setIsBooting(false);
    })();
  }, []);

  const logout = async () => {
    await clearTokens();
    setIsAuthed(false);
  };

  const login = async (email: string, password: string) => {
    const res = await authService.login({ email, password });
    await setAccessToken(res.accessToken);
    if (res.refreshToken) await setRefreshToken(res.refreshToken);
    setIsAuthed(true);
  };

  const register = async (email: string, password: string) => {
    const res = await authService.register({ email, password });
    await setAccessToken(res.accessToken);
    if (res.refreshToken) await setRefreshToken(res.refreshToken);
    setIsAuthed(true);
  };

  const value = useMemo(
    () => ({ isBooting, isAuthed, login, register, logout }),
    [isBooting, isAuthed]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
