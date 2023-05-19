import { useEffect } from 'react'
import ProgramForm from '../../components/ProgramForm/ProgramForm'
import './ProgramPage.css'
import { useNavigate } from 'react-router-dom'

import { useAuthContext } from '../../hooks/useAuthContext';


export default function ProgramPage() {
    const navigate = useNavigate()
    const { token } = useAuthContext()

    useEffect(() => {
        if (!token) {
            navigate('/login')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className='program-page'>
            <h1>Create a workout</h1>
            <ProgramForm />
        </div>
    )
}