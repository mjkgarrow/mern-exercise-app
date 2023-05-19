import { useLocalStorageContext } from './useLocalStorageContext';
import { useAuthContext } from "./useAuthContext"
import { ACTIONS } from '../context/Actions'


export const useLogout = () => {
    const { user } = useLocalStorageContext()
    const { authDispatcher } = useAuthContext()


    const logout = () => {
        // remove user from storage
        user.setPersistentUser(null)

        // remove user from global context
        authDispatcher({ type: ACTIONS.LOGOUT })
    }
    return { logout }
}