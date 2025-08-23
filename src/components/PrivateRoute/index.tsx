import type { ReactNode } from "react";
import { useKeycloak } from '@react-keycloak/web';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { keycloak, initialized } = useKeycloak();

  if (!initialized) return <div>Cargando...</div>;

  return keycloak?.authenticated ? <>{children}</> : <Navigate to="/unauthorized" />;
};

export default PrivateRoute;