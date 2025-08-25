import { useKeycloak } from "@react-keycloak/web";
import { useState } from "react";
import type { IMetrics } from "../models/metric.interface";
import getEnvVar from "../utils/GetEnvironment";

const useMetricsData = () => {
    const [data, setData] = useState<IMetrics>()
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const { keycloak } = useKeycloak();

    const fetchMetrics = async () => {
        try {
            if (!keycloak?.token) {
                throw new Error("No token available");
            }
            await keycloak.updateToken(30);
            const response = await fetch(`${getEnvVar("VITE_API_GATEWAY")}/customers/metrics`, {
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
        metrics: data,
        isLoading,
        error,
        fetchMetrics
    };
}
export default useMetricsData;