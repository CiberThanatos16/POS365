import { useEffect } from "react";

export default function Modal({ isOpen, onClose, children, size = "md" }) {

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") onClose();
        };

        if (isOpen) {
            window.addEventListener("keydown", handleEsc);
            document.body.style.overflow = "hidden";
        }

        return () => {
            window.removeEventListener("keydown", handleEsc);
            document.body.style.overflow = "auto";
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    // 🎯 tamaños dinámicos
    const sizes = {
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-2xl",
        xl: "max-w-4xl",
        full: "max-w-6xl"
    };

    return (
        <div
            onClick={onClose}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={`bg-gray-900 rounded-2xl shadow-xl p-4 sm:p-6 w-full mx-4 sm:mx-0 ${sizes[size]} max-h-[90vh] overflow-y-auto relative animate-fadeIn`}
            >
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-white text-xl"
                >
                    ✕
                </button>

                {children}
            </div>
        </div>
    );
}