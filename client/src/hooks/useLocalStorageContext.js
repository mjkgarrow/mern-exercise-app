import { useContext } from "react";
import { LocalStorageContext } from "../context/LocalStorageContext";

export function useLocalStorageContext() {
    const context = useContext(LocalStorageContext)

    if (!context) {
        return new Error("Local storage context not defined")
    }

    return context
}