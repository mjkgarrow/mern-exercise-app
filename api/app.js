// Imports
import express, { json } from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';
import dotenv from "dotenv";

// Initialise environment variables
dotenv.config();

// Initialise express app
const app = express()

// Controller and middleware imports
// import { requireAuth } from './middleware/requireAuth.js'
import workout from './controllers/workoutController.js';
import program from './controllers/programController.js';
import auth from './controllers/authController.js';

// Middleware 
app.use(json())
app.use(cors())
app.use(cookieParser())

// Auth route
app.use('/api/auth', auth);

// Protected routes
// app.use(requireAuth)
app.use('/api/workouts', workout);
app.use('/api/programs', program);

// Exports
export default app