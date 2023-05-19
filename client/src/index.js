import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { WorkoutContextProvider } from './context/WorkoutContext';
import { ProgramContextProvider } from './context/ProgramContext';
import { LocalStorageContextProvider } from './context/LocalStorageContext';
import { AuthContextProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LocalStorageContextProvider>
      <AuthContextProvider>
        <WorkoutContextProvider>
          <ProgramContextProvider>
            <App />
          </ProgramContextProvider>
        </WorkoutContextProvider>
      </AuthContextProvider>
    </LocalStorageContextProvider>
  </React.StrictMode>
);
