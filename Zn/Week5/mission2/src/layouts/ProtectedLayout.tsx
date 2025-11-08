import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet, useLocation, type Location } from "react-router-dom";

const ProtectedLayout = () => {
  const { accessToken }: { accessToken: string | null } = useAuth();
  const location: Location = useLocation();

  if (!accessToken) {
    return <Navigate to="/login" state={{ location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedLayout;
