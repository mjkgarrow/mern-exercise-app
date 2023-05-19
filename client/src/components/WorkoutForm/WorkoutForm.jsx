/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */

import './WorkoutForm.css'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useLocalStorageContext } from '../../hooks/useLocalStorageContext'
import { useWorkoutContext } from '../../hooks/useWorkoutContext'
import { useSubmitWorkout } from '../../hooks/useSubmitWorkout'


export default function WorkoutCard(props) {
    const { workoutData, workoutDispatcher } = useWorkoutContext()
    const navigate = useNavigate()
    const { programWorkoutData, setProgramWorkoutData, changeValues } = props
    const [repsSetsData, setRepsSetsData] = useState(null)
    const [weightChange, setWeightChange] = useState(false)
    const [newWeight, setNewWeight] = useState()
    const { workoutTime } = useLocalStorageContext()


    const { sendWorkout, isLoading } = useSubmitWorkout()

    // Generate sets/reps array
    useEffect(() => {
        if (programWorkoutData) {
            const repsSets = {};
            programWorkoutData.programExercises.forEach((exercise) => {
                const { _id, exerciseReps, exerciseSets } = exercise;
                const repsArray = Array.from({ length: exerciseSets }, () => [exerciseReps, false]);
                repsSets[_id] = repsArray;
            });
            setRepsSetsData(repsSets);
        }
    }, [changeValues]);


    // Handle changing reps and sets button display
    const handleSetsReps = (exerciseId, index) => {
        const modifiedReps = repsSetsData[exerciseId]

        if (!repsSetsData[exerciseId][index][1]) {
            modifiedReps[index][1] = true
            setRepsSetsData({ ...repsSetsData, [exerciseId]: modifiedReps })
        } else if (repsSetsData[exerciseId][index][0] > 0 && repsSetsData[exerciseId][index][1]) {
            modifiedReps[index][0] -= 1
            setRepsSetsData({ ...repsSetsData, [exerciseId]: modifiedReps })
        } else {
            let originalReps = programWorkoutData.programExercises.find(exercise => exercise._id === exerciseId).exerciseReps
            modifiedReps[index] = [originalReps, false]
            setRepsSetsData({ ...repsSetsData, [exerciseId]: modifiedReps })
        }
    }

    // handle changing weight text to input field to change weight
    const handleWeightClick = (exerciseId) => {
        setWeightChange(exerciseId)
        setNewWeight(programWorkoutData.programExercises.find(exercise => exercise._id === exerciseId).exerciseWeight)
    }

    // handle changing the weight values
    const handleWeightChange = (event) => {
        if (isNaN(Number(event.target.value))) {
            return
        } else {
            setNewWeight(event.target.value)
        }
    }

    // handle submitting new weight
    const approveWeight = (id) => {
        const newProgramData = {
            ...programWorkoutData, programExercises: programWorkoutData.programExercises.map(exercise => {
                if (exercise._id === id) {
                    return { ...exercise, exerciseWeight: newWeight }
                }
                return exercise
            })
        }
        setProgramWorkoutData(newProgramData)
        setWeightChange(false)
    }


    // Send new workout to API and redirect to history page
    const submitWorkout = async () => {
        await sendWorkout(programWorkoutData, repsSetsData, workoutTime)
        navigate('/history')
    }

    const handleStopWorkout = () => {
        navigate('/')
    }

    return (
        <div className="workoutPageContainer">
            {programWorkoutData && (
                <div>
                    <div className="workout-card">
                        <div className="workout-card-header">
                            <div className='workout-card-title'>
                                {programWorkoutData.programName}
                            </div>
                            <button className="stop-workout-button" onClick={handleStopWorkout}>
                                Stop
                            </button>
                        </div>
                        <div className={"workout-card-body"}>
                            {programWorkoutData.programExercises.map((exercise, index) =>
                                <div key={exercise._id} className="workoutcard-exercise-container">
                                    <div className="workoutcard-exercise-row">
                                        <div className='workoutcard-exercise-header'>
                                            <div className="workoutcard-exercise-name">{exercise.exerciseName}</div>
                                            <div className="workoutcard-exercise-weight">
                                                {weightChange === exercise._id ?
                                                    (
                                                        <>
                                                            <input
                                                                className='weight-input'
                                                                value={newWeight}
                                                                placeholder={exercise.exerciseWeight}
                                                                onChange={handleWeightChange}
                                                            ></input>
                                                            <button
                                                                className='wight-approval-button'
                                                                onClick={() => approveWeight(exercise._id)}></button>
                                                        </>
                                                    )
                                                    : (<button className='weight-button' onClick={() => handleWeightClick(exercise._id)}>{exercise.exerciseWeight}kg{exercise.exerciseWeight > 1 ? "s" : ""}</button>)
                                                }

                                            </div>
                                        </div>
                                        <div className="workoutcard-exercise-reps">
                                            {repsSetsData && repsSetsData[exercise._id].map((set, index_2) => {
                                                return (
                                                    <button
                                                        key={`index:${index_2},_id:${exercise._id}`}
                                                        className={repsSetsData[exercise._id][index_2][1] ? `${repsSetsData[exercise._id][index_2][0] === exercise.exerciseReps ? "set-reps-button-clicked" : "set-reps-button-clicked dropped-reps"}` : 'set-reps-button'}
                                                        // className={repsSetsData[exercise._id][index_2][1] ? 'set-reps-button-clicked' : 'set-reps-button'}
                                                        onClick={() => handleSetsReps(exercise._id, index_2)}>
                                                        {set[0]}
                                                    </button>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className='workout-card-submit'>
                            <button
                                disabled={isLoading} className='workout-card-submit-button' onClick={submitWorkout}>Finish workout</button>
                        </div>

                    </div>
                </div>
            )}
        </div>
    )
}

