import { ReactNode, useEffect, useState } from 'react';
import keycloak from './keycloak';
import { ReactKeycloakProvider } from '@react-keycloak/web';

interface Props {
  children: ReactNode;
}

const KeycloakAuthProvider = ({ children }: Props) => {
  console.log(keycloak)
  return (
    <ReactKeycloakProvider
      authClient={keycloak}
      initOptions={{ onLoad: 'login-required', checkLoginIframe: false, pkceMethod: 'S256' }} // 👈 fuerza el login
      isLoadingCheck={(keycloak) => !keycloak.didInitialize}
      
    >
      {children}
    </ReactKeycloakProvider>
  );
};

export default KeycloakAuthProvider;