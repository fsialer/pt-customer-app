import Keycloak from 'keycloak-js';
import getEnvVar from './utils/GetEnvironment';



const keycloak = new Keycloak({
  url: getEnvVar("VITE_KEYCLOAK_URL"),
  realm: getEnvVar("VITE_KEYCLOAK_REALM"),              // 👈 Nombre del realm
  clientId: getEnvVar("VITE_KEYCLOAK_CLIENT_ID")      // 👈 ID del cliente configurado en Keycloak
});



if ((window as any)._kc) {
  console.warn("Reutilizando instancia Keycloak");
} else {
  (window as any)._kc = keycloak;
}

//export default (window as any)._kc;
export default keycloak;