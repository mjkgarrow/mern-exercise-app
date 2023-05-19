import { useContext } from "react";
import { WorkoutContext } from "../context/WorkoutContext";

export function useWorkoutContext() {
    // return useContext(WorkoutContext)
    const context = useContext(WorkoutContext)

    if (!context) {
        return new Error("Workout context not defined")
    }

    return context
}