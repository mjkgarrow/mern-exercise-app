import mongoose from "mongoose";

const exercisesSchema = new mongoose.Schema({
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
})

const ProgramModel = mongoose.model('Programs', mongoose.Schema({
    programUser: {
        type: mongoose.Schema.ObjectId,
        ref: 'Users',
    },
    programName: {
        type: String,
        required: true,
    },
    programExercises: [exercisesSchema],
}))


export default ProgramModel

