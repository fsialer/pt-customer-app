import { useKeycloak } from "@react-keycloak/web";
import { useEffect, useState } from "react";
import type { ICustomer } from "../models/customer.interface";
import getEnvVar from "../utils/GetEnvironment";

const useCustomersData = () => {
    const [data, setData] = useState<ICustomer[]>([])
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const { keycloak } = useKeycloak();


    useEffect(() => {
        fetchCustomers();
    }, [])

    const fetchCustomers = async () => {
        try {
            if (!keycloak?.token) {
                throw new Error("No token available");
            }
            await keycloak.updateToken(30);
            const response = await fetch(`${getEnvVar("VITE_API_GATEWAY")}/customers`, {
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
        customers: data,
        isLoading,
        error
    };
}
export default useCustomersData;