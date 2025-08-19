import { useKeycloak } from "@react-keycloak/web";
import { useEffect, useState } from "react";

interface Customer {
    id?: string;
    name: string;
    lastName: string;
    age: number;
    birthDate: string;
}

const useCustomerSave = () => {
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const { keycloak, initialized } = useKeycloak();
    console.log("Keycloak desde hook:", keycloak);
    console.log("¿Está inicializado?", initialized);

    const saveCustomer = async (customer: Customer) => {
        try {
            setSaving(true);
            setError(null);
            if (!keycloak?.token) {
                throw new Error("No token available");
            }
            await keycloak.updateToken(30);
            const uri = customer.id ? `${import.meta.env.VITE_API_GATEWAY}/customers/${customer.id}` : `${import.meta.env.VITE_API_GATEWAY}/customers`
            const response = await fetch(uri, {
                method: customer.id ? "PUT" : "POST", // 👈 POST para crear, PUT para actualizar
                headers: {
                    'Authorization': `Bearer ${keycloak.token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(customer)
            });
            const savedCustomer = await response.json();
            if (!response.ok) {
                setError(new Error("Ups there an error." + savedCustomer.message));
            }
            return savedCustomer;
        } catch (error) {
            if (error instanceof Error) {
                setError(error);
            } else {
                setError(new Error("Error desconocido"));
            }
        } finally {
            setSaving(false);
        }
    }

    return {
        saveCustomer,
        saving,
        errorSave: error
    };
}
export default useCustomerSave;