/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { ACTIONS } from '../../context/Actions'
import './HistoryPage.css'
import { URL } from '../../utils/globals'
import { useWorkoutContext } from '../../hooks/useWorkoutContext'
import ContentLoading from '../../components/ContentLoading/ContentLoading'
import WorkoutHistoryCard from '../../components/WorkoutHistoryCard/WorkoutHistoryCard'
import { useAuthContext } from '../../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom'





export default function HistoryPage() {
    const { workoutData, workoutDispatcher } = useWorkoutContext()
    const [assetsLoaded, setAssetsLoaded] = useState(false)
    const { token } = useAuthContext()
    const navigate = useNavigate()

    useEffect(() => {

        if (token) {
            fetch(`${URL}/workouts/`, {
                method: "GET",
                mode: "cors",
                headers: { "Content-Type": "application/json", 'Authorization': `Bearer ${token}` }
            })
                .then(resp => resp.json())
                .then(data => {
                    workoutDispatcher({ type: ACTIONS.READ, payload: data })
                    setAssetsLoaded(true)

                })
                .catch(err => console.log(err.message))
        } else {
            navigate('/login')
        }
    }, [])

    useEffect(() => {
        setAssetsLoaded(true)
    }, [workoutData])


    return (
        <div className="historyPageContainer">
            {!assetsLoaded ? <ContentLoading /> : workoutData.length > 0 ?
                workoutData.map(workout => {
                    return (
                        <WorkoutHistoryCard key={workout._id} workout={workout} />
                    )
                })
                : <div key={'no-history'}>No workouts in history</div>
            }
        </div>

    )
}
