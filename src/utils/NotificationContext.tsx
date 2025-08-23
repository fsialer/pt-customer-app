import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

type NotificationType = "success" | "error" | "info";

interface Notification {
    message: string;
    type: NotificationType;
    duration?: number;
}

interface NotificationContextType {
    showNotification: (notification: Notification) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error("useNotification debe usarse dentro de NotificationProvider");
    }
    return context;
};

import Message from "../components/Message"; // Ajusta la ruta según tu estructura

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
    const [notification, setNotification] = useState<Notification | null>(null);
    const [visible, setVisible] = useState(false);

    const showNotification = (notification: Notification) => {
        setNotification(notification);
        setVisible(true);
    };

    return (
        <NotificationContext.Provider value={{ showNotification }}>
            {children}
            {visible && notification && (
                <Message
                    message={notification.message}
                    type={notification.type}
                    duration={notification.duration}
                    onClose={() => setVisible(false)}
                />
            )}
        </NotificationContext.Provider>
    );
};
