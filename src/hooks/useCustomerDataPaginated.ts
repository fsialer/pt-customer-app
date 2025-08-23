import { useKeycloak } from "@react-keycloak/web";
import { useEffect, useState } from "react";
import type { ICustomer } from "../models/customer.interface";

interface paginated {
    content: ICustomer[];
    totalElements: number;
}

type useCustomersDataPaginatedProps = {
    page: number;
    size: number;
}

const useCustomersDataPaginated = () => {
    const [data, setData] = useState<paginated>({ content: [], totalElements: 0 });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const { keycloak } = useKeycloak();

    useEffect(() => {
        fetchCustomers({ page: 1, size: 12 });
    }, [])

    const fetchCustomers = async ({ page, size }: useCustomersDataPaginatedProps) => {
        try {
            if (!keycloak?.token) {
                throw new Error("No token available");
            }
            await keycloak.updateToken(30);
            const response = await fetch(`${import.meta.env.VITE_API_GATEWAY}/customers/paginated?size=${size}&page=${page}`, {
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
        customers: data.content,
        isLoading,
        error,
        total: data.totalElements,
        fetchCustomers
    };
}
export default useCustomersDataPaginated;