import { isRouteErrorResponse, useRouteError } from "react-router";

const Error404 = () => {
  const error = useRouteError();
  return (
    <>
      <h1>404 - Página no encontrada</h1>
      {isRouteErrorResponse(error) ? (
        <p>
          {error.status} - {error.statusText}
        </p>
      ) : (
        <p>{(error as Error)?.message || 'Ruta inválida'}</p>
      )}
    </>
  );
}

export default Error404;