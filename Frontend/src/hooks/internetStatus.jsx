import { useEffect, useState } from "react";

export function useInternetStatus() {
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    useEffect(() => {
        const online = () => setIsOnline(true);
        const offline = () => setIsOnline(false);

        window.addEventListener("online", online);
        window.addEventListener("offline", offline);

        return () => {
            window.removeEventListener("online", online);
            window.removeEventListener("offline", offline);
        };
    }, []);

    const handleClick = (e) => {
        if (!isOnline) {
            e.preventDefault();
            alert("No hay conexión a internet");
        }
    };

    return {
        isOnline,
        handleClick
    };
}