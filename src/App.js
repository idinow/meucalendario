import React, { useState } from 'react';
import LoginForm from './pages/login';
import MyCalendar from './pages/calendar';

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const handleLogin = () => {
    setUserLoggedIn(true);
  };

  return (
    <div>
      {userLoggedIn ? (
        <div className="App">
          {/* Renderizar a tela principal aqui após o login */}
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