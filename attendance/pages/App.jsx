import { useState } from 'react';
import { useRouter } from 'next/router';

import Login from './Login.jsx'
import StudentDashboard from './StudentDashboard.jsx'

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    const handleLogin = () => {
        setIsLoggedIn(true);
        router.push('/dashboard');
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        router.push('/login');
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
