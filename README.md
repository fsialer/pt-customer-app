# PT Customer App

Aplicación web desarrollada en **React + TypeScript** usando **Vite** como bundler, autenticación con **Keycloak** y estilos con **TailwindCSS**. Permite gestionar clientes (crear, listar, editar, eliminar) y visualizar métricas de edad.

## Características

- **Autenticación**: Integración con Keycloak mediante `@react-keycloak/web`.
- **Gestión de clientes**: CRUD completo de clientes.
- **Métricas**: Visualización de edad promedio y desviación estándar.
- **Paginación**: Listado de clientes paginado.
- **Protección de rutas**: Acceso restringido a rutas privadas.
- **Estilos**: TailwindCSS.
- **Consumo de API**: Comunicación con un API Gateway definido por variables de entorno.

## Estructura del proyecto

```
src/
  components/         # Componentes reutilizables (NavBar, CustomerList, Metrics, etc.)
  hooks/              # Custom hooks para lógica de negocio (fetch, delete, save, etc.)
  routes/             # Definición de rutas con protección
  views/              # Vistas principales (Home, Customer, Error404)
  KeycloakProvider.tsx# Proveedor de autenticación Keycloak
  keycloak.ts         # Configuración de Keycloak
  App.tsx             # Componente raíz
  main.tsx            # Punto de entrada
public/               # Archivos estáticos
```

## Variables de entorno

Copia `.env.example` a `.env` y configura según tu entorno:

```env
VITE_KEYCLOAK_URL=http://keycloak-server:8080
VITE_KEYCLOAK_REALM=react-realm
VITE_KEYCLOAK_CLIENT_ID=react-customer-app
VITE_API_GATEWAY=http://manantial-gateway:8090/api/v1
VITE_CUSTOMER_URL=/customers
```

## Scripts disponibles

- `npm run dev` — Inicia el servidor de desarrollo.
- `npm run build` — Compila la aplicación para producción.
- `npm run preview` — Previsualiza la build de producción.
- `npm run lint` — Linting del código.

## Instalación

1. Clona el repositorio.
2. Instala dependencias:

   ```sh
   npm install
   ```

3. Configura el archivo `.env`.
4. Inicia el servidor de desarrollo:

   ```sh
   npm run dev
   ```

## Dependencias principales

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Keycloak-js](https://www.keycloak.org/)
- [@react-keycloak/web](https://www.npmjs.com/package/@react-keycloak/web)
- [React Hook Form](https://react-hook-form.com/)
- [React Router v7](https://reactrouter.com/)

## Notas

- El acceso a las rutas de clientes está protegido y requiere autenticación.
- El API Gateway y Keycloak deben estar accesibles desde la aplicación.
- El código está organizado para facilitar la escalabilidad y el mantenimiento.

---

¿Dudas o sugerencias? ¡Abre un issue o