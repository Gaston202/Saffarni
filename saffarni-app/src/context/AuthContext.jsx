import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { decodeJwt } from "@/utils/jwt";
import { AuthContext } from "./auth";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const expiryTimerRef = useRef(null);

  // 🔹 RESTORE AUTH ON APP LOAD
  useEffect(() => {
    const restore = async () => {
      const storedToken = localStorage.getItem("token");

      if (storedToken) {
        const decoded = decodeJwt(storedToken);

        if (decoded && decoded.exp * 1000 > Date.now()) {
          setToken(storedToken);

          try {
            const API_URL =
              import.meta.env.VITE_API_URL || "http://localhost:6005/api";

            const res = await axios.get(
              `${API_URL}/users/${decoded.id}`,
              {
                headers: {
                  Authorization: `Bearer ${storedToken}`,
                },
              }
            );

            if (res.data?.user) {
              setUser(res.data.user);
            } else {
              setUser({
                _id: decoded.id,
                email: decoded.email || "",
                role: decoded.role,
              });
            }
          } catch (err) {
            console.error("restore user fetch failed", err);
            setUser({
              _id: decoded.id,
              email: decoded.email || "",
              role: decoded.role,
            });
          }
        } else {
          localStorage.removeItem("token");
        }
      }

      setLoading(false);
    };

    restore();
  }, []);

  // 🔹 AUTO LOGOUT ON TOKEN EXPIRY
  useEffect(() => {
    if (expiryTimerRef.current) {
      clearTimeout(expiryTimerRef.current);
      expiryTimerRef.current = null;
    }

    if (!token) return;

    const decoded = decodeJwt(token);
    if (!decoded?.exp) return;

    const expiresInMs = decoded.exp * 1000 - Date.now();

    if (expiresInMs <= 0) {
      logout();
      return;
    }

    expiryTimerRef.current = setTimeout(logout, expiresInMs);

    return () => {
      if (expiryTimerRef.current) {
        clearTimeout(expiryTimerRef.current);
        expiryTimerRef.current = null;
      }
    };
  }, [token]);

  // 🔹 LOGIN
  const login = async (jwt) => {
    const decoded = decodeJwt(jwt);
    if (!decoded) return null;

    localStorage.setItem("token", jwt);
    setToken(jwt);

    try {
      const API_URL =
        import.meta.env.VITE_API_URL || "http://localhost:6005/api";

      const res = await axios.get(
        `${API_URL}/users/${decoded.id}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      if (res.data?.user) {
        setUser(res.data.user);
        return res.data.user;
      }
    } catch (err) {
      console.error("login fetch user failed", err);
    }

    const fallbackUser = {
      _id: decoded.id,
      email: decoded.email || "",
      role: decoded.role,
    };

    setUser(fallbackUser);
    return fallbackUser;
  };

  // 🔹 LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  // 🔹 REFRESH USER
  const refreshUser = async () => {
    if (!token || !user?._id) return null;

    try {
      const API_URL =
        import.meta.env.VITE_API_URL || "http://localhost:6005/api";

      const res = await axios.get(
        `${API_URL}/users/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
      value={{
        user,
        token,
        loading,
        login,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
