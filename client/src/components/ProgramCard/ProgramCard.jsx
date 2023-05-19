// import { useProgramContext } from '../hooks/useProgramContext'
import { ACTIONS } from '../../context/Actions'
import { useProgramContext } from '../../hooks/useProgramContext'
import './ProgramCard.css'
import { Link } from 'react-router-dom'
import { URL } from '../../utils/globals'
import ToolTip from '../ToolTip/ToolTip'
import { useLocalStorageContext } from '../../hooks/useLocalStorageContext'
import { useAuthContext } from '../../hooks/useAuthContext'

export default function ProgramCard(props) {
    const programContext = useProgramContext()
    const localStorageContext = useLocalStorageContext()
    const { token } = useAuthContext()

    const handleDelete = () => {
        if (props.program._id === "0") {
            programContext.programDispatcher({ type: ACTIONS.DELETE, payload: props.program })
        } else {
            fetch(`${URL}/programs/delete/${props.program._id}`, {
                method: "DELETE",
                mode: "cors",
                headers: { "Content-Type": "application/json", 'Authorization': `Bearer ${token}` }
            })
                .then(resp => resp.json())
                .then(data => programContext.programDispatcher({ type: ACTIONS.DELETE, payload: data }))
                .catch(err => console.log(err))
        }
    }

    const handleWorkoutClick = () => {
        // start time in local storage
        const currentTime = new Date().getTime()
        localStorageContext.workoutTime.setPersistentWorkoutTime(currentTime)

        // add chosen workout to local storage
        localStorageContext.workoutData.setPersistentWorkoutData(programContext.programData.find(program => program._id === props.program._id))
    }

    return (
        <div key={props.program._id}>
            <button className='program-card-delete' onClick={handleDelete}>
                <ToolTip tooltip={"Delete workout"} />
            </button>
            <Link
                to={`/workout/${props.program._id}`}
                onClick={handleWorkoutClick}>
                <div className="program-card">
                    <div className="program-card-header">
                        <div className='program-card-title'>{props.program.programName}</div>
                    </div>
                    <div className={"program-card-body"}>
                        {props.program.programExercises.map(exercise =>
                            <div key={exercise._id} className="exercise-container">
                                <div className="exercise-row">
                                    <div className="exercise-name">{exercise.exerciseName}</div>
                                    <div className="exercise-reps">{exercise.exerciseSets}x{exercise.exerciseReps}</div>
                                    <div className="exercise-weight">{exercise.exerciseWeight}kg{exercise.exerciseWeight > 1 ? "s" : ""}</div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </Link>
        </div>
    )
}