import { Navigate } from "react-router-dom";
import useAuth from "../utils/UserRole";

function PrivateRoute({ children, allowedRoles }) {
  const { isAuthenticated, user, loading } = useAuth();

  // Wait for auth state to be loaded from localStorage
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return <Navigate to="/login" />;

  // If allowedRoles is provided, check if user's role is allowed
  if (allowedRoles && user?.role) {
    return allowedRoles.includes(user.role) ? children : <Navigate to="/" />;
  }

  // If no allowedRoles specified, just check authentication
  return children;
}

export default PrivateRoute;
