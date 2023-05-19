import { Router } from 'express'
import WorkoutModel from '../models/WorkoutModel.js'
import ProgramModel from '../models/ProgramModel.js'



const router = Router()

// Get all workouts
router.get('/', (req, res) => {
    WorkoutModel.find({ workoutUser: req.user._id })
        .then(data => res.json(data))
        .catch((err) => {
            res.status(400).json({ error: err.message });
        })
    console.log('Read workouts')
})

// Create a workout
router.post('/create', (req, res) => {

    WorkoutModel.create({
        workoutUser: req.user._id,
        workoutDate: req.body.workoutDate,
        workoutDuration: req.body.workoutDuration,
        workoutInfo: req.body.workoutInfo,
    })
        .then(newWorkout => {

            const exercises = req.body.workoutInfo.programExercises

            const newExerciseProgression = exercises.reduce((prev, exercise) => {
                let progress = true
                exercise.completedRepsSets.forEach(set => {
                    if (!set[1] || set[0] !== exercise.exerciseReps) {
                        progress = false
                    }
                })
                if (progress) {
                    let updatedExercise = { ...exercise, exerciseWeight: exercise.exerciseWeight + exercise.exerciseProgression }
                    delete updatedExercise.completedRepsSets
                    return [...prev, updatedExercise]
                } else {
                    let updatedExercise = { ...exercise }
                    delete updatedExercise.completedRepsSets
                    return [...prev, updatedExercise]
                }
            }, [])

            // Update program
            ProgramModel.findOneAndUpdate(
                { _id: req.body.workoutInfo._id },
                {
                    $set: {
                        programExercises: newExerciseProgression
                    }
                },
                { new: true }
            )
                .then(updatedProgram => res.json(newWorkout))
        })
        .catch((err) => {
            res.status(400).json({ error: err.message });
        })

    console.log('Create workout')
})


// Delete a workout
router.delete('/delete/:id', (req, res) => {
    WorkoutModel.findOneAndDelete({ _id: req.params.id })
        .then(deletedWorkout => res.json(deletedWorkout))
        .catch((err) => {
            console.error(err);
            res.status(400).json({ error: err.message });
        })
    console.log('Delete workout')
})

export default router
