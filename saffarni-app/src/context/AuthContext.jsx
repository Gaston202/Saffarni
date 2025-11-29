import React, { createContext, useState, useEffect, useRef } from "react";
import axios from "axios";
// jwt-decode import can cause Vite ESM issues in some setups.
// Use a small inlined JWT decoder to avoid bundler export problems.
function decodeJwt(token) {
  try {
    const payload = token.split(".")[1];
    if (!payload) return {};
    // add padding if necessary
    const padded = payload.replace(/-/g, "+").replace(/_/g, "/");
    const b64 = padded + "==".slice((2 - padded.length * 3) & 3);
    const json = atob(b64);
    try {
      // decode percent-encoded UTF-8
      return JSON.parse(decodeURIComponent(escape(json)));
    } catch (e) {
      return JSON.parse(json);
    }
  } catch (err) {
    console.error("decodeJwt failed", err);
    return {};
  }
}

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // on mount, restore from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (storedToken) setToken(storedToken);
    if (storedUser) setUser(JSON.parse(storedUser));
    setLoading(false);
  }, []);

  // watch token expiry and auto-logout when it expires
  const expiryTimerRef = useRef(null);
  useEffect(() => {
    // clear existing timer
    if (expiryTimerRef.current) {
      clearTimeout(expiryTimerRef.current);
      expiryTimerRef.current = null;
    }

    if (!token) return;

    try {
      const decoded = decodeJwt(token);
      // JWT exp is in seconds
      const expMs = decoded.exp ? decoded.exp * 1000 : null;
      if (!expMs) return;

      const now = Date.now();
      if (expMs <= now) {
        // token already expired
        logout();
        return;
      }

      // set timer to logout when token expires
      const msUntilExpiry = expMs - now;
      expiryTimerRef.current = setTimeout(() => {
        logout();
      }, msUntilExpiry);
    } catch (err) {
      console.error("Invalid token, logging out", err);
      logout();
    }

    // cleanup
    return () => {
      if (expiryTimerRef.current) {
        clearTimeout(expiryTimerRef.current);
        expiryTimerRef.current = null;
      }
    };
  }, [token]);

  // persist changes
  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  const login = (userData, jwt) => {
    setUser(userData);
    setToken(jwt);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  // helper to refresh user from API using stored token
  const refreshUser = async () => {
    try {
      if (!user || !user._id || !token) return null;
      const res = await axios.get(
        `http://localhost:6005/api/users/${user._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.data?.user) {
        setUser(res.data.user);
        return res.data.user;
      }
    } catch (err) {
      console.error("refreshUser error:", err);
    }
    return null;
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, refreshUser, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
