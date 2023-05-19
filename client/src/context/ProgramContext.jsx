import { createContext, useReducer } from 'react'
import { ACTIONS } from './Actions'

export const ProgramContext = createContext()


function programReducer(state, action) {
    let stateEditable = [...state]

    switch (action.type) {
        case ACTIONS.CREATE:
            return [...stateEditable, action.payload]

        case ACTIONS.READ:
            return action.payload

        case ACTIONS.UPDATE:
            return stateEditable.map(program => {
                if (program.id === action.payload.id) {
                    return action.payload
                } else {
                    return program
                }
            })

        case ACTIONS.DELETE:
            return stateEditable.filter(program => program._id !== action.payload._id)

        default:
            return stateEditable
    }
}

export function ProgramContextProvider({ children }) {
    const [programData, programDispatcher] = useReducer(programReducer, [null])

    return (
        <ProgramContext.Provider value={{ programData, programDispatcher }}>
            {children}
        </ProgramContext.Provider>
    )



}

