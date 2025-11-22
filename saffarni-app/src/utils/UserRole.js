import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

// Hook used by components (Navbar) to access auth state
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) return { isAuthenticated: false, user: null, logout: () => {} };

  const { user, logout } = ctx;
  return {
    isAuthenticated: !!user,
    user,
    logout,
  };
}

export default useAuth;
