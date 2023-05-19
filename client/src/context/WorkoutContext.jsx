import { createContext, useReducer } from 'react'
import { ACTIONS } from './Actions'

export const WorkoutContext = createContext()

function workoutReducer(state, action) {
    let stateEditable = [...state]

    switch (action.type) {
        case ACTIONS.CREATE:
            return [...stateEditable, action.payload]

        case ACTIONS.READ:
            return action.payload.sort((a, b) => new Date(b.workoutDate) - new Date(a.workoutDate))


        case ACTIONS.UPDATE:
            return stateEditable.map(workout => {
                if (workout._id === action.payload._id) {
                    return action.payload
                } else {
                    return workout
                }
            })

        case ACTIONS.DELETE:
            return stateEditable.filter(workout => workout._id !== action.payload._id)

        default:
            return state
    }
}

export function WorkoutContextProvider({ children }) {
    const [workoutData, workoutDispatcher] = useReducer(workoutReducer, [])

    return (
        <WorkoutContext.Provider value={{ workoutData, workoutDispatcher }}>
            {children}
        </WorkoutContext.Provider>
    )
}