import { createContext } from 'react'
import { useLocalStorage } from 'react-use'

export const LocalStorageContext = createContext()

export function LocalStorageContextProvider({ children }) {
    const [persistentProgramData, setPersistentProgramData] = useLocalStorage('programData', [])
    const [persistentWorkoutData, setPersistentWorkoutData] = useLocalStorage('workoutData', {})
    const [persistentWorkoutTime, setPersistentWorkoutTime] = useLocalStorage('workoutTime', null)
    const [persistentUser, setPersistentUser] = useLocalStorage('user', null)


    return (
        <LocalStorageContext.Provider value={{
            programData: { persistentProgramData, setPersistentProgramData },
            workoutData: { persistentWorkoutData, setPersistentWorkoutData },
            workoutTime: { persistentWorkoutTime, setPersistentWorkoutTime },
            user: { persistentUser, setPersistentUser }
        }}>
            {children}
        </LocalStorageContext.Provider>
    )
}

