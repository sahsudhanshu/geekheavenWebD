import { useEffect, type JSX } from "react";

type ToastProps = {
    type: "success" | "error" | "info";
    message: string;
    onClose: () => void;
};

export default function Toast({ type, message, onClose }: ToastProps) {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    const icons: Record<string, JSX.Element> = {
        success: (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" className="animate-draw" />
            </svg>
        ),
        error: (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                <path d="M6 6l12 12" className="animate-draw" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6 18L18 6" className="animate-draw" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        info: (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                <circle cx="12" cy="12" r="9" className="animate-draw" />
                <line x1="12" y1="16" x2="12" y2="12" className="animate-draw" />
                <circle cx="12" cy="8" r="1" fill="white" />
            </svg>
        ),
    };

    const bgColors: Record<string, string> = {
        success: "bg-green-600",
        error: "bg-red-600",
        info: "bg-blue-600",
    };

    return (
        <div
            className={`fixed top-20 right-5 px-4 py-3 rounded-lg shadow-lg font-medium text-white text-[15px] flex items-center gap-2 animate-slideInLeft ${bgColors[type]} z-[100]`}
        >
            {icons[type]}
            <span>{message}</span>
        </div>
    );
}
