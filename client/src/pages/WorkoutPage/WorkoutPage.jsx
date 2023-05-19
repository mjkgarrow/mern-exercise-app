/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */

import './WorkoutPage.css'
import WorkoutForm from '../../components/WorkoutForm/WorkoutForm'
import { useNavigate, useParams } from 'react-router-dom'
import { useProgramContext } from '../../hooks/useProgramContext'
import { useEffect, useState } from 'react'
import { ACTIONS } from '../../context/Actions'
import { useLocalStorageContext } from '../../hooks/useLocalStorageContext'
import { useWorkoutContext } from '../../hooks/useWorkoutContext'
import { URL } from '../../utils/globals'
import { useAuthContext } from '../../hooks/useAuthContext';

export default function WorkoutPage(props) {
    const programContext = useProgramContext()
    const localStorageContext = useLocalStorageContext()
    const [changeValues, setChangeValues] = useState(false)
    const [programWorkoutData, setProgramWorkoutData] = useState(null)
    const navigate = useNavigate()
    const { token } = useAuthContext()


    let { _id } = useParams()

    // Get the specific workout program from the local storage
    function getLocalProgramData(id) {
        const storedPrograms = localStorageContext.programData.persistentProgramData

        if (storedPrograms) {
            const storedWorkoutData = storedPrograms.find(program => program._id === id)
            return storedWorkoutData
        }
        return null
    }

    // If page was refreshed (and context lost) load data from localStorage into context
    useEffect(() => {
        if (!token) {
            navigate('/login')
        }
        if (programContext.programData[0] === null) {
            programContext.programDispatcher({ type: ACTIONS.READ, payload: [localStorageContext.programData.persistentProgramData] })
            localStorageContext.workoutData.setPersistentWorkoutData(getLocalProgramData(_id))
        }
    }, []);

    // On change of programContext, set local state to local storage
    useEffect(() => {
        setProgramWorkoutData(getLocalProgramData(_id))

        // update local values to trigger building repsSets array in workoutCard
        setChangeValues(!changeValues)
    }, [programContext.programData]);


    return (
        <WorkoutForm _id={_id}
            changeValues={changeValues}
            programWorkoutData={programWorkoutData}
            setProgramWorkoutData={setProgramWorkoutData} />
    )
}

