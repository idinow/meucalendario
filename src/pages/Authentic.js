import React, { useEffect, useState} from "react";
import '../App.js';
import App from "../App.js";

const Authentic = () => {
    const [userLoggedIn, setUserLoggedIn] = useState(null);

    useEffect(() => {
      const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
      setUserLoggedIn(isLoggedIn);
    }, []);
  
  
    const handleLogout = () => {
      setUserLoggedIn(false);
      localStorage.removeItem('userLoggedIn');
      <App />
      window.location.reload();
    };


    return (
        <div className="sairBotton">{userLoggedIn ? <><button onClick={handleLogout}>Sair</button></> : <p>Desconectado</p>}
        </div>
    );
};

export default Authentic;