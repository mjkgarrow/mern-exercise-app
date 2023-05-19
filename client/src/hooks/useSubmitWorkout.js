import { useState } from 'react'
import { URL } from '../utils/globals'
import { useAuthContext } from './useAuthContext';




export function useSubmitWorkout() {
    const [error, setError] = useState(null)
    const { token } = useAuthContext()
    const [isLoading, setIsLoading] = useState(null)

    const sendWorkout = async (programWorkoutData, repsSetsData, workoutTime) => {
        setIsLoading(true)
        setError(null)

        const sendWorkoutData = {
            workoutDate: new Date(),
            workoutDuration: new Date().getTime() - workoutTime.persistentWorkoutTime,
            workoutInfo: {
                _id: programWorkoutData._id,
                programName: programWorkoutData.programName,
                programExercises: programWorkoutData.programExercises.reduce((prev, exercise) => {
                    exercise.completedRepsSets = repsSetsData[exercise._id]
                    return [...prev, exercise]
                }, [])
            }
        }

        const response = await fetch(`${URL}/workouts/create`, {
            method: "POST",
            mode: "cors",
            headers: { "Content-Type": "application/json", 'Authorization': `Bearer ${token}` },
            body: JSON.stringify(sendWorkoutData)
        })

        const jsonData = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(jsonData.error)
        } else {
            setIsLoading(false)
        }
    }

    return { sendWorkout, isLoading, error, setError }
}