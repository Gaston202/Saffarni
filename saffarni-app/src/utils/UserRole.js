import { useContext } from "react";
import { AuthContext } from "@/context/auth";

// Hook used by components (Navbar) to access auth state
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) return { isAuthenticated: false, user: null, logout: () => {}, loading: false };

  const { user, logout, loading } = ctx;
  return {
    isAuthenticated: !!user,
    user,
    logout,
    loading,
  };
}

export default useAuth;
