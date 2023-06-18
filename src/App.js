import React, { useState, useEffect } from 'react';
import LoginForm from './pages/login';
import MyCalendar from './pages/calendar';
import Authentic from './pages/Authentic';

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
    setUserLoggedIn(isLoggedIn);
  }, []);

  const handleLogin = () => {
    setUserLoggedIn(true);
    localStorage.setItem('userLoggedIn', 'true');
  };

  return (
    <div>
      {userLoggedIn ? (
        <div className="App">
          {/* Renderizar a tela principal aqui após o login */}
          <Authentic />
          <MyCalendar />
        </div>
      ) : (
        <div className="App">
          {/* Renderizar o formulário de login */}
          <LoginForm onLogin={handleLogin} />
        </div>
      )}
    </div>

  );
}

export default App;