import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import type { RootState } from "../../app/store";

interface PrivateRouteProps {
  children: React.ReactNode;
  isAdminPath?: boolean;
}

export function PrivateRoute({ children, isAdminPath }: PrivateRouteProps) {
  const token = localStorage.getItem("token");
  const isUserAdmin = useAppSelector(
    (state: RootState) => state.auth.isUserAdmin
  );

  if (token) {
    if (isAdminPath && !isUserAdmin) {
      return <Navigate to="/login" />;
    } else {
      return children;
    }
  } else {
    return <Navigate to="/login" />;
  }
}
