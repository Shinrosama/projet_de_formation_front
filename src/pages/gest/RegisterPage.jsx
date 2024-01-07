import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../component/gest/Header";
import Footer from "../../component/gest/Footer";
import './registerPage.scss'

const RegisterPage = () => {

//je veux pouvoir stocker l'état au rechargement du composant pour afficher le bon message
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  //je veux pouvoir faire un fetch donc ma fonction dois être asyncrhone
  const handleRegistration = async (event) => {
    event.preventDefault();
//je fait en sorte de récupérer les valeurs présentes dans les formulaires
    const username = event.target.username.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

//je veux comparer les champs relatifs au mots de passes pour autoriser ou non l'inscription

if (password !== confirmPassword) {

    setMessage(`Le mot de passe ne correspond pas.`);

    return;
}

//je veux que le remplissage des champs se face en foction du modèle de mon API 
    const registerData = {
      username: username,
      password: password,
//par défaut l'utilisateur se voit donner le role édit
      RoleId: 3
    };
//je veux que les informations de l'utilisateur soient converties au format Json
    const registerDataJson = JSON.stringify(registerData);
//je veux pouvoir crée un utilisateur via la méthode post en faisant un fetch sur mon Api
    const registerResponse = await fetch("http://localhost:3005/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: registerDataJson,
    });

   
//je veux rediriger l'utilisateur vers la loginPage si la réponse est positive(201)
    if (registerResponse.status === 201) {
      
      setMessage("Vous vous êtes bien enregistré");
      navigate("/login");
    } else {
//sinon je lui indique une erreur        
      setMessage("Erreur lors de l'enregistrement");
    }
  };

  return (
      <>
        <Header/>
        <section className="sectionRegister">
            <h2 className="registerTitle">Rejoignez Nous.</h2>
          {message && <p>{message}</p>}
          <form onSubmit={handleRegistration} className="formRegister">
            <label className="labelUserReg">
              <input className="userReg" placeholder="Nom d'utilisateur" type="text" name="username" />
            </label>
            <label className="labelPasswordReg">
              
              <input className="passReg" placeholder="Mot de passe" type="password" name="password" />
            </label>
            <label className="labelConfirmPass">
              
              <input className="passConfirmReg" placeholder="Confirmer le mot de passe" type="password" name="confirmPassword" />
            </label>
            <input className="submitReg" type="submit" />
          </form>
        </section>
        <Footer/>
      </>
  );
};

export default RegisterPage;