import { Link } from "react-router-dom";
import logo from '../../assets/images/logo.jpg';
import home from '../../assets/icones/accueil.png';
import login from '../../assets/icones/utilisateur.png';
import contact from '../../assets/icones/contact.png';
import './header.scss';

const Header = () => {
  return (
    <header className="head">
    

      <nav className="nav">
        <ul className="ulNav">
          <li className="liLogo">
              <Link className="homelogo" to="/"><img className="logo" src={logo}alt="logo"/></Link>
          </li>
          <li className="liNav">
            <Link className="home" to="/"><img className="homeIcone" src={home} alt="home"/></Link>
          </li>
          <li className="liNav">
            <Link className="login" to="/login"><img className="loginIcone" src={login} alt="home"/></Link>
          </li>
          <li className="liNav">
            <Link className="contacts" to="/contacts"><img className="contactIcone" src={contact} alt="home"/></Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;