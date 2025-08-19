import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: import.meta.env.VITE_KEYCLOAK_URL, // 👈 URL de tu Keycloak
  realm: import.meta.env.VITE_KEYCLOAK_REALM,                 // 👈 Nombre del realm
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,     // 👈 ID del cliente configurado en Keycloak
});

if ((window as any)._kc) {
  console.warn("Reutilizando instancia Keycloak");
} else {
  (window as any)._kc = keycloak;
}

//export default (window as any)._kc;
export default keycloak;