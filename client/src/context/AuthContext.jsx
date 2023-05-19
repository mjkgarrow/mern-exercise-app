import { createContext, useEffect, useReducer } from 'react'
import { ACTIONS } from './Actions'
import { useLocalStorageContext } from '../hooks/useLocalStorageContext'

export const AuthContext = createContext()


function authReducer(state, action) {
    let stateEditable = { ...state }

    switch (action.type) {
        case ACTIONS.LOGIN:
            return action.payload

        case ACTIONS.LOGOUT:
            return null

        default:
            return stateEditable
    }
}

export function AuthContextProvider({ children }) {
    const [authData, authDispatcher] = useReducer(authReducer, { user: null })
    const { user } = useLocalStorageContext()

    // Overwrite global context with persistent data
    useEffect(() => {
        if (user.persistentUser) {
            authDispatcher({ type: ACTIONS.LOGIN, payload: user.persistentUser })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // // When notesData is updated, apply the change to the localStorage
    // useEffect(() => {
    //     user.setPersistentUser(authData)
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [authData])


    return (
        <AuthContext.Provider value={{ ...authData, authDispatcher }}>
            {children}
        </AuthContext.Provider>
    )



}

