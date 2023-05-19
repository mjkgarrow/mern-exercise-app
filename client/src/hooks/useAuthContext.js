import { useContext } from "react";
import { AuthContext } from "../context/AuthContext"

export function useAuthContext() {
    // return useContext(WorkoutContext)
    const context = useContext(AuthContext)

    if (!context) {
        return new Error("Auth context not defined")
    }

    return context
}