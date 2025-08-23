import { useKeycloak } from "@react-keycloak/web";
import { useState } from "react";
import type { ICustomer } from "../models/customer.interface";

const useCustomerSave = () => {
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const { keycloak } = useKeycloak();


    const saveCustomer = async (customer: ICustomer) => {
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