import { useContext } from "react";
import { ProgramContext } from "../context/ProgramContext";

export function useProgramContext() {
    // return useContext(ProgramContext)
    const context = useContext(ProgramContext)

    if (!context) {
        return new Error("Program context not defined")
    }

    return context


}