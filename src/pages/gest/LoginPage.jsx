import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../component/gest/Header";
import Footer from "../../component/gest/Footer";
import './loginPage.scss'

const LoginPage = () => {
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    const username = event.target.username.value;
    const password = event.target.password.value;

    const loginData = {
      username,
      password,
    };

    const loginDataJson = JSON.stringify(loginData);

    const loginResponse = await fetch("http://localhost:3005/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: loginDataJson,
    });

    const loginResponseData = await loginResponse.json();
    const token = loginResponseData.data;

    if (token) {
      localStorage.setItem("jwt", token);
      setMessage("Vous êtes bien connecté");
      navigate("/");
    } else {
      setMessage("Erreur lors de la connexion");
    }
  };
  const handleLogout = () => {
    // sortir le token du local storage
    localStorage.removeItem("jwt");

    // redirige l'utilisateur vers la page de login
    navigate("/login");
  };

  return (
      <>
        <Header/>
        <section className="sectionLog">
          {message && <p>{message}</p>}
          <form onSubmit={handleLogin} className="formLog">
            <label className="labelUser">
              
              <input className="userLog" placeholder="Nom d'utilisateur" type="text" name="username" />
            </label>
            <label className="labelPassword">
              
              <input className="passLog" placeholder="Mot de passe" type="password" name="password" />
            </label>
            <input className="submitLog"  type="submit" value="Se connecter" />
            
              <button className="logout" onClick={handleLogout}>Se déconnecter</button>
            
          </form>
          <div className="btnBloc">
            <div className="suscribeDiv">
              <Link className="suscribe" to="/register">Inscrivez vous</Link>
            </div>
            <div className="userDiv">
              <Link className="userAcount" to="/user">Votre compte</Link>
            </div>
          </div>
          
        </section>
        <Footer/>
      </>
  );
};

export default LoginPage;