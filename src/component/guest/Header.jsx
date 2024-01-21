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
          <Link className="home" to="/">
              <li className="liNav">
                  <img className="homeIcone" src={home} alt="home"/>
              </li>
          </Link>
          <Link className="login" to="/login">
              <li className="liNav">
                  <img className="loginIcone" src={login} alt="home"/>
              </li>
          </Link>
          <Link className="contacts" to="/contacts">
              <li className="liNav">
                  <img className="contactIcone" src={contact} alt="home"/>
              </li>
          </Link>
        </ul>
      </nav>
    </header>
  );
};

export default Header;