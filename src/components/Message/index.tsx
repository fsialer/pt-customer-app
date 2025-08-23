import { useEffect, useState } from "react";

type MessageProps = {
    message: string;
    type: "success" | "error" | "info";
    duration?: number; // opcional: duración en ms
    onClose?: () => void;
}
const Message = ({ message, type, duration = 3000, onClose }: MessageProps) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
            onClose?.();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    const getColor = (type: "success" | "error" | "info") => {
        switch (type) {
            case "success":
                return "bg-green-500";
            case "error":
                return "bg-red-500";
            case "info":
                return "bg-blue-500";
            default:
                return "";
        }
    };

    if (!visible) return null;

    return (
        <div
            className={
                `fixed top-6 right-6 z-50 px-4 py-3 rounded shadow-lg text-white animate-slide-in ${getColor(type)}`
            }
        >
            <p>{message}</p>
        </div>
    );
}

export default Message;