import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { URL } from '../utils/globals'
import { ACTIONS } from '../context/Actions'
import { useLocalStorageContext } from './useLocalStorageContext'
import { useNavigate } from 'react-router-dom'






export function useSubmitAuth() {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { token, authDispatcher } = useAuthContext()
    const { user } = useLocalStorageContext()
    const navigate = useNavigate()

    const submitAuth = async (email, password, register) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch(register ? `${URL}/auth/register` : `${URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json", 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ email, password }),
        })

        const jsonData = await response.json()



        if (!response.ok) {
            setIsLoading(false)
            setError(jsonData.error)
        } else {
            // save user to local storage
            user.setPersistentUser(jsonData)

            // update user context
            authDispatcher({ type: ACTIONS.LOGIN, payload: jsonData })

            setIsLoading(false)
            navigate('/')

        }
        // console.log(jsonData.token)
    }

    return { submitAuth, isLoading, error, setError }
}