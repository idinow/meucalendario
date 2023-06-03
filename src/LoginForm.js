import React, { useState } from 'react';
// import logo from './calendar/calendarLogo.png'
import './LoginForm.css';

function LoginForm({ onLogin }) {
  const [showLogin, setShowLogin] = useState(true);

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="geral">
       <div className="container">
            <h2>{showLogin ? 'Login' : 'Cadastrar Novo Usuário'}</h2>
            {showLogin ? (
                <form id="login-form" className="login-form" onSubmit={handleLoginSubmit}>
                <input type="text" name="username" placeholder="Nome de usuário" required />
                <br />
                <input type="password" name="password" placeholder="Senha" required />
                <br />
                <input type="submit" value="Entrar" />
                <p>
                    Não tem uma conta?{' '}
                    <span className="toggle-form" onClick={toggleForm}>
                    Cadastre-se
                    </span>
                </p>
                </form>
            ) : (
                <form id="signup-form" className="login-form">
                <input type="text" name="name" placeholder="Nome" required />
                <br />
                <input type="text" name="username" placeholder="Nome de usuário" required />
                <br />
                <input type="password" name="password" placeholder="Senha" required />
                <br />
                <input type="submit" value="Cadastrar" />
                <p>
                    Já tem uma conta?{' '}
                    <span className="toggle-form" onClick={toggleForm}>
                    Fazer login
                    </span>
                </p>
                </form>
            )}
        </div>
    </div>
  );
}

export default LoginForm;
