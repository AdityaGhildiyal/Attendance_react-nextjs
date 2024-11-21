import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Login from './Login.jsx'
import StudentDashboard from './StudentDashboard.jsx'

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    const handleLogin = () => {
        setIsLoggedIn(true);
        navigate('/dashboard');
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        navigate('/login');
    };

    return(
      <>
        {isLoggedIn ? (
            <StudentDashboard onLogout={handleLogout} />
        ) : (
            <Login onLogin={handleLogin} />
        )}
      </>
    );
}

export default App;
