import { NavLink, useLocation } from 'react-router-dom';
import './Navbar.css';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useLogout } from '../../hooks/useLogout';


export default function Navbar() {
    const location = useLocation();
    const { token } = useAuthContext()


    const { logout } = useLogout()

    const isActiveForPaths = (location) => {
        const { pathname } = location;
        return pathname === '/' || pathname.includes('/workout');
    };

    return (
        <nav className="navbar">
            <div className="right-links">
                <ul className="nav-list">
                    <li className="nav-item">
                        <NavLink to={"/"}
                            className={({ isActive }) => isActiveForPaths(location) ? 'active' : ''}>
                            Workout
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/programs">Create workout program</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/history">History</NavLink>
                    </li>
                </ul>
            </div>
            <div className="right-links">
                <ul className="nav-list">
                    {token ?
                        (<li className="nav-item login">
                            <NavLink to="/login" onClick={logout}>Logout</NavLink>
                        </li>)
                        :
                        (<>
                            <li className="nav-item login">
                                <NavLink to="/register">Register</NavLink>
                            </li>
                            <li className="nav-item login">
                                <NavLink to="/login">Login</NavLink>
                            </li>
                        </>)
                    }
                </ul>
            </div>
        </nav>
    );
}
