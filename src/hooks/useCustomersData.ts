import { useKeycloak } from "@react-keycloak/web";
import { useEffect, useState } from "react";

interface Customer {
    id: string;
    name: string;
    lastName: string;
    age: number;
    birthDate: string;
}

const useCustomersData = () => {
    const [data, setData] = useState<Customer[]>([])
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const { keycloak, initialized } = useKeycloak();
    console.log("Keycloak desde hook:", keycloak);
    console.log("¿Está inicializado?", initialized);

    useEffect(() => {
        fetchCustomers();
    }, [])

    const fetchCustomers = async () => {
        try {
            if (!keycloak?.token) {
                throw new Error("No token available");
            }
            await keycloak.updateToken(30);
            const response = await fetch(`${import.meta.env.VITE_API_GATEWAY}/customers`, {
                headers: {
                    'Authorization': `Bearer ${keycloak.token}`,
                    'Content-Type': 'application/json',
                }
            });
            console.log(response)
            if(response.status!=200){
                setError(new Error(response.statusText));
            }
            const data = await response.json();
            setData(data);
        } catch (error) {
            console.log("error",error)
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