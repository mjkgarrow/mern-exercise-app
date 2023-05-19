import request from 'supertest';
import mongoose from "mongoose";
import app from '../app.js';
import ProgramModel from '../models/ProgramModel.js'

const programData = {
    programName: "WorkoutA",
    programExercises: [
        {
            exerciseName: "Deadlift",
            exerciseWeight: 60,
            exerciseProgression: 5,
            exerciseReps: 5,
            exerciseSets: 3
        },
        {
            exerciseName: "Pullup",
            exerciseWeight: 5,
            exerciseProgression: 2.5,
            exerciseReps: 10,
            exerciseSets: 3
        }
    ]
}

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

});

afterAll(async () => {
    await mongoose.connection.close();
});

afterEach(async () => {
    const collections = await mongoose.connection.db.collections()
    for (const collection of collections) {
        await collection.deleteMany({});
    }
});

describe('Program Routes', () => {

    // Create a program
    describe('POST /create', () => {
        it('should create a new program', async () => {
            const response = await request(app)
                .post('/api/programs/create')
                .send(programData)

            expect(response.statusCode).toBe(200)
            expect(response.body).toHaveProperty('_id')
            expect(response.body.programUser).toEqual(programData.user)
            expect(response.body.programName).toEqual(programData.programName)
            expect(response.body.programExercises[0].exerciseName).toEqual(programData.programExercises[0].exerciseName)
        });
    });


    // Read programs
    describe('GET /api/programs', () => {
        it('should get all programs', async () => {
            const res = await request(app).get('/api/programs');
            expect(res.statusCode).toEqual(200);
        });
    });


    // Update a program
    describe('PUT /api/programs/update/:id', () => {
        it('should update a program', async () => {
            const create = await request(app)
                .post('/api/programs/create')
                .send(programData)

            let programId = create.body._id

            const res = await request(app)
                .put(`/api/programs/update/${programId}`)
                .send({
                    programName: 'Updated Program',
                    programExercises: [
                        {
                            exerciseName: 'Updated Exercise',
                            exerciseReps: 10,
                        },
                    ],
                });
            expect(res.statusCode).toEqual(200);
            expect(res.body.programName).toEqual('Updated Program');
            expect(res.body.programExercises[0].exerciseName).toEqual('Updated Exercise');
            expect(res.body.programExercises[0].exerciseReps).toEqual(10);
        });
    });


    // Delete a program
    describe('DELETE /api/programs/delete/:id', () => {

        it('should delete a program', async () => {
            const create = await request(app)
                .post('/api/programs/create')
                .send(programData)
            let programId = create.body._id

            const res = await request(app).delete(`/api/programs/delete/${programId}`);

            expect(res.statusCode).toEqual(200);
            expect(res.body.programName).toEqual(programData.programName);
            expect(res.body.programExercises[0].exerciseName).toEqual(programData.programExercises[0].exerciseName);
        });
    });

});

