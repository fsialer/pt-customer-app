import { useEffect, useState } from "react";
import useMetricsData from "../../hooks/useMetricsData";

interface Metrics {
    average: number;
    standardDeviation: number;
}

const Metrics = () => {

    const { metrics: initialMetrics, isLoading, error } = useMetricsData();
    const [metrics, setMetrics] = useState(initialMetrics);

    useEffect(() => {
        setMetrics(initialMetrics);
    }, [initialMetrics]);
    
    return (
        <div className="flex flex-wrap  justify-center items-center pt-6 gap-4">
            <div className="bg-gray-900 flex flex-col px-4 py-4 text-white text-center rounded-md ">
                <h1 className="text-4xl">Average age</h1>
                <p className="text-6xl">{metrics ? metrics?.average.toFixed(2) : 0} Year</p>
            </div>
            <div className="bg-gray-900 px-4 py-4 text-white  rounded-md ">
                <h1 className="text-4xl text-center">Variability</h1>
                <p className="text-6xl">± {metrics ? metrics?.standardDeviation.toFixed(2) : 0} Year</p>
            </div>
        </div>
    )
}

export default Metrics;