import { useEffect } from "react";
import useMetricsData from "../../hooks/useMetricsData";
import { useKeycloak } from "@react-keycloak/web";


const Metrics = () => {

    const { metrics, isLoading, error, fetchMetrics } = useMetricsData();
    const { keycloak } = useKeycloak();

    useEffect(() => {
        if (keycloak?.authenticated) {
            fetchMetrics();
        }
    }, [keycloak?.authenticated])

    // Nuevo efecto para mostrar notificación de error
    if (error) {
        return (
            <div className="text-center">
                <h1 className="bg-red-500 text-white">Error: {error.message}</h1>
            </div>
        )
    }

    return (
        <div className="flex flex-wrap  justify-center items-center pt-6 gap-4">
            <div className="bg-gray-900 flex flex-col px-4 py-4 text-white text-center rounded-md ">
                <h1 className="text-4xl">Average age</h1>
                {isLoading ? (
                    <p className="text-6xl">Loading...</p>
                ) : (<p className="text-6xl">{metrics?.average.toFixed(2)} Year</p>)}

            </div>
            <div className="bg-gray-900 px-4 py-4 text-white  rounded-md ">
                <h1 className="text-4xl text-center">Variability</h1>
                {isLoading ? (
                    <p className="text-6xl">Loading...</p>
                ) : (<p className="text-6xl">± {metrics?.standardDeviation.toFixed(2)} Year</p>)}
            </div>
        </div>
    )
}

export default Metrics;