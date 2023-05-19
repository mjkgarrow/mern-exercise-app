import { useState } from 'react'
import './WorkoutHistoryCard.css'
import ToolTip from '../ToolTip/ToolTip'
import { useWorkoutContext } from '../../hooks/useWorkoutContext'
import { ACTIONS } from '../../context/Actions'
import { URL } from '../../utils/globals'
import { useAuthContext } from '../../hooks/useAuthContext'



export default function WorkoutHistoryCard(props) {
    const [clicked, setClicked] = useState(false)
    const { workout } = props
    const { workoutDispatcher } = useWorkoutContext()
    const { token } = useAuthContext()


    function describeMilliseconds(milliseconds) {
        const date = new Date(milliseconds);
        const hours = date.getUTCHours();
        const minutes = date.getUTCMinutes();
        const seconds = date.getUTCSeconds();

        const parts = [];
        if (hours > 0) {
            parts.push(`${hours} hour${hours > 1 ? 's' : ''}`);
        }
        if (minutes > 0) {
            parts.push(`${minutes} minute${minutes > 1 ? 's' : ''}`);
        }
        if (seconds > 0 && minutes === 0) {
            parts.push(`${seconds} second${seconds > 1 ? 's' : ''}`);
        }

        if (parts.length === 0) {
            return '0 seconds';
        } else {
            return parts.join(', ');
        }
    }

    function calculateLifted() {
        let lifted = 0

        workout.workoutInfo.programExercises.forEach(exercise => {
            let totalReps = exercise.completedRepsSets.reduce((prev, set) => {
                if (set[1]) {
                    return prev + set[0]
                }
                return prev
            }, 0)
            if (exercise.exerciseWeight) {
                lifted += exercise.exerciseWeight * totalReps
            }
        })
        return `${lifted}${lifted ? " kgs" : " kg"}`
    }

    const handleExpandInfo = (id) => {
        setClicked(!clicked)
    }

    const handleDelete = () => {
        fetch(`${URL}/workouts/delete/${workout._id}`, {
            method: "DELETE",
            mode: "cors",
            headers: { "Content-Type": "application/json", 'Authorization': `Bearer ${token}` }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                // Process the successful response
                return response.json(); // or response.text() if expecting plain text response
            })
            .then(data => workoutDispatcher({ type: ACTIONS.DELETE, payload: data }))
            .catch(err => console.log(err))

    }


    return (
        <>
            <div className='workout-history-card-container' >
                <button className='workout-history-card-delete' onClick={handleDelete}>
                    <ToolTip tooltip={"Delete workout"} />
                </button>
                <div className="workout-history-card" onClick={() => handleExpandInfo(workout._id)}>
                    <div className="workout-history-card-header">
                        <div className='title-descriptors'>
                            <div>Workout</div>
                            <div>Date</div>
                            <div>Duration</div>
                            <div>Total lifted</div>
                        </div>
                        <div className='title-data'>
                            <div>{workout.workoutInfo.programName}</div>
                            <div>{new Date(workout.workoutDate).toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</div>
                            <div>{describeMilliseconds(workout.workoutDuration)}</div>
                            <div>{calculateLifted()}</div>
                        </div>
                    </div>
                    <div className={"workout-history-card-body"}>
                        {clicked && workout.workoutInfo.programExercises.map(exercise => {
                            return (
                                <div className='workout-history-exercise' key={exercise._id}>
                                    <div className='workout-history-exercise-title'>
                                        <div>{exercise.exerciseName}</div>
                                        <div className='workout-history-exercise-weight'>{exercise.exerciseWeight}kg{exercise.exerciseWeight > 1 ? "s" : ""}</div>
                                    </div>
                                    <div>
                                        <div className='workout-history-repsSets'>
                                            {exercise.completedRepsSets.map((set, index) => {
                                                return (
                                                    <div key={index} className={(set[1] && set[0] === exercise.exerciseReps) ? 'repsSets' : `repsSets ${set[0] < exercise.exerciseReps ? "repsSetsDropped" : "repsSetsFalse"}`}>
                                                        <div className='repsSetsValue'>

                                                            {set[1] ? set[0] : "X"}
                                                        </div>
                                                    </div>

                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}

                    </div>
                </div>
            </div>
        </>
    )
}
