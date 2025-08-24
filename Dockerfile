# Etapa 1: Build de la aplicación
FROM node:20-alpine AS builder

WORKDIR /app

# Copia solo los archivos necesarios para instalar dependencias primero (mejor cache)
COPY package.json package-lock.json ./
RUN npm ci --prefer-offline

# Copia el resto del código fuente
COPY . .

# Construye la aplicación para producción
RUN npm run build

# Etapa 2: Servidor web para servir archivos estáticos
FROM nginx:alpine

# Elimina la configuración por defecto de nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia el build generado desde la etapa anterior
COPY --from=builder /app/dist /usr/share/nginx/html

# Copia una configuración personalizada de nginx si la tienes
# COPY nginx.conf /etc/nginx/nginx.conf

# ✅ Agregar usuario no-root con UID ≥ 10000
RUN adduser -D -u 10001 appuser

# Dar permisos a appuser sobre los directorios necesarios
RUN chown -R appuser:appuser /var/cache/nginx /var/run /etc/nginx /usr/share/nginx/html

# ✅ Cambiar al usuario
USER appuser

# Agregar metadatos como labels
LABEL maintainer="Fernando Sialer" \
      org.opencontainers.image.title="customer-app" \
      org.opencontainers.image.description="Aplicación web desarrollada en React + TypeScript usando Vite como bundler, autenticación con Keycloak y estilos con TailwindCSS. Permite gestionar clientes (crear, listar, editar, eliminar) y visualizar métricas de edad." \
      org.opencontainers.image.authors="Fernando Sialer" \
      org.opencontainers.image.source="https://github.com/fsialer/pt-customer-app" 

# Expone el puerto 80
EXPOSE 80

# Comando por defecto
CMD ["nginx", "-g", "daemon off;"]