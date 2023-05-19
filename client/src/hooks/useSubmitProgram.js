import { useState } from 'react'
import { URL } from '../utils/globals'
import { useProgramContext } from './useProgramContext';
import { ACTIONS } from '../context/Actions';
import { useAuthContext } from './useAuthContext';


export function useSubmitProgram() {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { programDispatcher } = useProgramContext();
    const { token } = useAuthContext()


    const sendProgram = async (data) => {
        setIsLoading(true)
        setError(null)

        const filteredData = { ...data, programExercises: data.programExercises.filter((exercise) => exercise.exerciseName.trim() !== '') }

        const response = await fetch(`${URL}/programs/create`, {
            method: "POST",
            mode: "cors",
            headers: { "Content-Type": "application/json", 'Authorization': `Bearer ${token}` },
            body: JSON.stringify(filteredData),
        })

        const jsonData = response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(jsonData.error)
        } else {
            programDispatcher({ type: ACTIONS.CREATE, payload: jsonData })
            setIsLoading(false)
        }
    }

    return { sendProgram, isLoading, error, setError }
}