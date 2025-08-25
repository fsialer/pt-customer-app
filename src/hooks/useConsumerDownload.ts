import { useKeycloak } from "@react-keycloak/web";
import { useState } from "react";
import getEnvVar from "../utils/GetEnvironment";

type useConsumerDownloadType = {
    id: string
}

const useConsumerDownload = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { keycloak } = useKeycloak();


    const fetchImage = async ({ id }: useConsumerDownloadType) => {
        setLoading(true);
        setError(null);

        try {
            if (!keycloak?.token) {
                throw new Error("Token no disponible");
            }

            await keycloak.updateToken(30);

            const response = await fetch(`${getEnvVar("VITE_API_GATEWAY")}/consumer/download?id=${id}`, {
                headers: {
                    Authorization: `Bearer ${keycloak.token}`
                }
            });

            if (!response.ok) {
                throw new Error(`Error al descargar el archivo (${response.status})`);
            }

            const blob = await response.blob();
            const url = URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = url;
            link.download = `customer_${id}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        } catch (err: any) {
            setError(err.message || "Ocurrió un error desconocido");
            console.error("Download error:", err);
        } finally {
            setLoading(false);
        }
    };

    return { fetchImage, loading, error };
}

export default useConsumerDownload;