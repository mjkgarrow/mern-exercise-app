import express from 'express';
import ProgramModel from '../models/ProgramModel.js'
import { requireAuth } from '../middleware/requireAuth.js';

const router = express.Router();

// Create a program
router.post('/create', requireAuth, (req, res) => {
    console.log(req.user._id)
    ProgramModel.create({
        programUser: req.user._id,
        programName: req.body.programName,
        programExercises: req.body.programExercises
    })
        .then(newProgram => res.json(newProgram))
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: 'Server error' });
        })
    console.log('Create program')
})


// Read programs
router.get('/', requireAuth, (req, res) => {
    ProgramModel.find({ programUser: req.user._id })
        .then(workouts => res.json(workouts))
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: 'Server error' });
        })
    console.log('Read program')
})


// Update a program
router.put('/update/:id', requireAuth, (req, res) => {
    ProgramModel.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { new: true }
    )
        .then(updatedProgram => res.json(updatedProgram))
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: 'Server error' });
        })

    console.log('Update program')
})


// Delete a program
router.delete('/delete/:id', requireAuth, (req, res) => {
    ProgramModel.findOneAndDelete({ _id: req.params.id })
        .then(deletedProgram => res.json(deletedProgram))
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: 'Server error' });
        })
    console.log('Delete program')
});

export default router
