#!/bin/sh

# Crear env.js con las variables de entorno definidas
cat <<EOF > /usr/share/nginx/html/env.js
window.env = {
  VITE_KEYCLOAK_URL: "${VITE_KEYCLOAK_URL}",
  VITE_KEYCLOAK_REALM: "${VITE_KEYCLOAK_REALM}",
  VITE_KEYCLOAK_CLIENT_ID: "${VITE_KEYCLOAK_CLIENT_ID}",
  VITE_API_GATEWAY: "${VITE_API_GATEWAY}",
  VITE_CUSTOMER_URL: "${VITE_CUSTOMER_URL}"
};
EOF

# Ejecutar nginx
exec "$@"