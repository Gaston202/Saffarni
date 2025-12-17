import React, { useState, useEffect} from "react";
import axios from "axios";
import { decodeJwt } from "@/utils/jwt";
import { AuthContext } from "./AuthContext"; 

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);


  //  RESTORE AUTH
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

            setUser(res.data?.user ?? {
              _id: decoded.id,
              email: decoded.email || "",
              role: decoded.role,
            });
          } catch {
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

  // AUTO LOGOUT
  useEffect(() => {
    if (!token) return;

    const decoded = decodeJwt(token);
    if (!decoded?.exp) return;

    const timeout = decoded.exp * 1000 - Date.now();
    if (timeout <= 0) return logout();

    const timer = setTimeout(logout, timeout);
    return () => clearTimeout(timer);
  }, [token]);

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
          headers: { Authorization: `Bearer ${jwt}` },
        }
      );

      setUser(res.data?.user);
      return res.data?.user;
    } catch {
      const fallback = {
        _id: decoded.id,
        email: decoded.email || "",
        role: decoded.role,
      };
      setUser(fallback);
      return fallback;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  return (
   <AuthContext.Provider value={{ user, token, loading, login, logout }}>
  {!loading && children}
 </AuthContext.Provider>

  );
  
}


export default AuthProvider;
