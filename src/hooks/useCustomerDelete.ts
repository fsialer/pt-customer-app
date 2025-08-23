import { useKeycloak } from "@react-keycloak/web";
import { useState } from "react";

const useCustomerDelete = () => {
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const { keycloak } = useKeycloak();

    const deleteCustomer = async (id: string) => {
        try {
            setDeleting(true);
            setError(null);
            if (!keycloak?.token) {
                throw new Error("No token available");
            }
            await keycloak.updateToken(30);
            const uri = `${import.meta.env.VITE_API_GATEWAY}/customers/${id}`
            const response = await fetch(uri, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${keycloak.token}`,
                    'Content-Type': 'application/json',
                }
            });
            const savedCustomer = await response.json();
            if (!response.ok) {
                setError(new Error("Ups there an error." + savedCustomer.message));
            }
        } catch (error) {
            if (error instanceof Error) {
                setError(error);
            } else {
                setError(new Error("Error desconocido"));
            }
        } finally {
            setDeleting(false);
        }
    }

    return {
        deleteCustomer,
        deleting,
        errorDelete: error
    };
}
export default useCustomerDelete;