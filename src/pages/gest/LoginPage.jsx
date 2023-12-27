import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
      navigate("/admin/");
    } else {
      setMessage("Erreur lors de la connexion");
    }
  };

  return (
      <>
        <Header/>
        <section className="section">
          {message && <p>{message}</p>}
          <form onSubmit={handleLogin}>
            <label className="labelUser">
              Nom d'utilisateur
              <input className="user" type="text" name="username" />
            </label>
            <label className="labelPassword">
              Mot de passe
              <input className="pass" type="password" name="password" />
            </label>
            <input className="submit" type="submit" />
          </form>
        </section>
        <Footer/>
      </>
  );
};

export default LoginPage;