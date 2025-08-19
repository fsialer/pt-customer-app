import { createBrowserRouter, RouterProvider } from "react-router";
import Customer from "../views/Customer";
import Error404 from "../views/Error404";
import Home from "../views/Home";
import PrivateRoute from "../components/PrivateRoute";
import CustomerCreate from "../components/CustomerCreate";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/customer',
        element: (
            <PrivateRoute>
                <Customer />
            </PrivateRoute>
        )
    },
    {
        path: '/create-customer',
        element: <CustomerCreate></CustomerCreate>
    },
    {
        path: '/edit-customer/:id',
        element: <CustomerCreate></CustomerCreate>
    },
    {
        path: '/unauthorized', // 👈 Ruta wildcard para no encontradas
        element: (<h1>no athorizado</h1>)
    },
    {
        path: '*', // 👈 Ruta wildcard para no encontradas
        element: <Error404 />,
    },

])

const MyRoutes = () => <RouterProvider router={router} />;

export default MyRoutes;