import { useKeycloak } from "@react-keycloak/web";
import { useEffect, useState } from "react";
import type { ICustomer } from "../models/customer.interface";
import getEnvVar from "../utils/GetEnvironment";

interface useCustomerDataProps {
    id: string | null
}

const useCustomerData = ({ id }: useCustomerDataProps) => {
    const [data, setData] = useState<ICustomer>()
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const { keycloak, initialized } = useKeycloak();


    useEffect(() => {
        if (!initialized) return; // 👈 esperar a que Keycloak esté listo
        if (!id) return;          // 👈 no buscar si no hay id
        fetchCustomer();
    }, [initialized, id])

    const fetchCustomer = async () => {
        try {
            if (!keycloak?.token) {
                throw new Error("No token available");
            }
            await keycloak.updateToken(30);
            const response = await fetch(`${getEnvVar("VITE_API_GATEWAY")}/customers/${id}`, {
                headers: {
                    'Authorization': `Bearer ${keycloak.token}`,
                    'Content-Type': 'application/json',
                }
            });
            if (response.status != 200) {
                setError(new Error(response.statusText));
            }
            const data = await response.json();
            setData(data);
        } catch (error) {
            if (error instanceof Error) {
                setError(error);
            } else {
                setError(new Error("Error desconocido"));
            }
        } finally {
            setIsLoading(false);
        }
    }

    return {
        customer: data,
        isLoading,
        error
    };
}
export default useCustomerData;