import type { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { PUBLIC_ROUTE, USER_ROLE } from "../enums";

interface ProtectedRouteProps {
  element: ReactElement;
  allowedRoles: USER_ROLE[];
}

const ProtectedRoute = ({ element, allowedRoles }: ProtectedRouteProps) => {
  const { getLocalStorage } = useLocalStorage();
  const user = getLocalStorage("user");

  if (!allowedRoles.includes(user?.role)) {
    return <Navigate to={PUBLIC_ROUTE.UNAUTHORIZED} replace />;
  }

  return element;
};

export default ProtectedRoute;
