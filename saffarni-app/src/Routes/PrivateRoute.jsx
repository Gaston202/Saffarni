import { Navigate } from "react-router-dom";
import { UserRole } from "../utils/UserRole";

function PrivateRoute({ children, allowedRoles }) {
  const role = UserRole();

  if (!role) return <Navigate to="/login" />;

  return allowedRoles.includes(role)
    ? children
    : <Navigate to="/" />;
}

export default PrivateRoute;
