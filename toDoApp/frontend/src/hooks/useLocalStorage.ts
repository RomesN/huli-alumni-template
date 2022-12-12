import { useEffect, useState } from "react";
import { LocalStorage } from "../shared/types/others";

const useLocalStorage = <T>(defaultValue: T, key: string): LocalStorage<T> => {
    const [value, setValue] = useState<T>(() => {
        const value = localStorage.getItem(key);

        return value ? (JSON.parse(value) as T) : defaultValue;
    });

    useEffect(() => {
        if (!value) {
            localStorage.removeItem(key);
        } else {
            localStorage.setItem(key, JSON.stringify(value));
        }
    }, [key, value]);

    return [value, setValue];
};

export { useLocalStorage };
