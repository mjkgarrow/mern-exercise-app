import mongoose from "mongoose";

const programExercisesSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.ObjectId,
        required: true,
    },
    exerciseName: {
        type: String,
        required: true,
    },
    exerciseProgression: {
        type: Number,
        required: true,
    },
    exerciseWeight: {
        type: Number,
        required: true,
    },
    exerciseReps: {
        type: Number,
        required: true,
    },
    exerciseSets: {
        type: Number,
        required: true,
    },
    completedRepsSets: [
        [
            {
                type: Number,
                required: true,
            },
            {
                type: Boolean,
                required: true,
            },
        ]
    ]
}, { autoCreate: false });



const WorkoutModel = mongoose.model('Workout', mongoose.Schema({
    workoutUser: {
        type: mongoose.Schema.ObjectId,
        ref: 'Users',
    },
    workoutDate: {
        type: Date,
        default: Date.now(),
    },
    workoutDuration: {
        type: Number,
        required: true,
    },
    workoutInfo: {
        _id: {
            type: mongoose.Schema.ObjectId,
            ref: 'Programs',
        },
        programName: {
            type: String,
            required: true,
        },
        programExercises: [programExercisesSchema]
    }
}))

export default WorkoutModel



