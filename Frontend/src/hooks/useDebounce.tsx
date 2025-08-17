import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay: number): T {
    const [val, setVal] = useState(value)

    useEffect(() => {
        const handler = setTimeout(() => {
            setVal(value)
        }, delay)
        return () => {
            clearTimeout(handler)
        }
    }, [value, delay]);
    return val;
}