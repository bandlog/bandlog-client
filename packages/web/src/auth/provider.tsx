import { createContext, type ReactNode, useCallback, useState } from "react";
import { authApi } from "./api";
import type { User } from "./entities/user";

export interface AuthContext {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}

const key = "auth.user";

const getStoredUser = () => {
  const user = localStorage.getItem(key);
  return user ? JSON.parse(user) : null;
};

const setStoredUser = (user: User | null) => {
  if (user) {
    localStorage.setItem(key, JSON.stringify(user));
  } else {
    localStorage.removeItem(key);
  }
};

export const AuthContext = createContext<AuthContext>({
  isAuthenticated: false,
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(getStoredUser());
  const isAuthenticated = !!user;

  const login = useCallback(async (email: string, password: string) => {
    const user = await authApi.login(email, password);
    setUser(user);
    setStoredUser(user);
  }, []);

  const logout = () => {
    setUser(null);
    setStoredUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
