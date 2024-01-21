import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../component/guest/Header";
import Footer from "../../component/guest/Footer";
import { jwtDecode } from "jwt-decode";
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

      const decodedToken = jwtDecode(token);

      if (decodedToken.role <= 2) {
          setMessage("Vous êtes bien connecté en tant qu'admin");
          navigate("/admin");
      } else {
          setMessage("Vous êtes bien connecté");
          navigate("/");
      }
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
            <Link className="suscribe suscribeDiv" to="/register">
              <div className="">
                Inscrivez vous
              </div>
            </Link>
            <Link className="userAcount userDiv" to="/user">
              <div className="">
                Votre compte
              </div>
            </Link>
          </div>          
        </section>
        <Footer/>
      </>
  );
};

export default LoginPage;