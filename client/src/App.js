import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import HomePage from './pages/HomePage/HomePage'
import ProgramPage from './pages/ProgramPage/ProgramPage';
import WorkoutPage from './pages/WorkoutPage/WorkoutPage';
import HistoryPage from './pages/HistoryPage/HistoryPage';
import { useAuthContext } from './hooks/useAuthContext';
import AuthPage from './pages/AuthPage/AuthPage';

export default function App() {
  const { token } = useAuthContext()

  // console.log(authData)

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        {!token ?
          (<Routes>
            <Route path="/" element={<AuthPage type={"Login"} />} />
            <Route path="/programs" element={<AuthPage type={"Login"} />} />
            <Route path="/workout/:_id" element={<AuthPage type={"Login"} />} />
            <Route path="/history" element={<AuthPage type={"Login"} />} />
            <Route path="/register" element={<AuthPage type={"Register"} />} />
            <Route path="/login" element={<AuthPage type={"Login"} />} />
            <Route path='*' element={<AuthPage type={"Login"} />} />
          </Routes>)
          :
          (<Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/programs" element={<ProgramPage />} />
            <Route path="/workout/:_id" element={<WorkoutPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/register" element={<AuthPage type={"Register"} />} />
            <Route path="/login" element={<AuthPage type={"Login"} />} />
            <Route path='*' element={<Navigate to='/' />} />
          </Routes>)}

      </BrowserRouter>
    </div>
  );
}