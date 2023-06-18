import React, { useEffect, useState } from 'react';
// import logo from './calendar/calendarLogo.png'
import './LoginForm.css';
import { addDoc, collection, getDocs} from 'firebase/firestore';
import db, { auth } from '../../services/firebaseConnection.js';
import { reload, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

function LoginForm({ onLogin }) {
  const [showLogin, setShowLogin] = useState(true);

  const userCollectionRef = collection(db, "users");
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState(null);

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  async function handleLoginSubmit(e) {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, senha)
    .then((userCredential) => {
      console.log(userCredential);
      window.alert('Login efetuado!');
      onLogin();
    })
    .catch((error) => {
      setErro(error.message);
      console.log(error);
      alert(`Ocorreu um erro: ${error.message}`);
    });
};

async function handleLoginCreate(e) {
  e.preventDefault();
  createUserWithEmailAndPassword(auth, email, senha)
  .then((userCredential) => {
    console.log(userCredential);
    window.alert('Usuário criado. Vá na página do login!');
  })
  .catch((error) => {
    setErro(error.message);
    console.log(error);
    alert(`Ocorreu um erro: ${error.message}`);
  });
};


  return (
    <div className="geral">
       <div className="container">
            <h2>{showLogin ? 'Login' : 'Cadastrar Novo Usuário'}</h2>
            {showLogin ? (
                <form id="login-form" className="login-form">
                <input type="text" name="email" placeholder="Digite seu e-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <br />
                <input type="password" name="password" placeholder="Senha (min. 6 dígitos)" value={senha} onChange={(e) => setSenha(e.target.value)} required />
                <br />
                <input type="submit" value="Entrar" onClick={handleLoginSubmit} />
                <p>
                    Não tem uma conta?{' '}
                    <span className="toggle-form" onClick={toggleForm}>
                    Cadastre-se
                    </span>
                </p>
                </form>
            ) : (
                <form id="signup-form" className="login-form" onSubmit={handleLoginCreate}>
                <input type="text" name="name" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} required />
                <br />
                <input type="text" name="email" placeholder="Digite seu e-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <br />
                <input type="password" name="password" placeholder="Senha (mín. 6 dígitos)" value={senha} onChange={(e) => setSenha(e.target.value)} required />
                <br />
                <input type="submit" value="Cadastrar" onClick={handleLoginCreate}/>
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
};

export default LoginForm;
