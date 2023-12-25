import { Link } from "react-router-dom";
import logo from '../../assets/images/logo.jpg';
import './header.scss';

const Header = () => {
  return (
    <header className="head">
    

      <nav className="nav">
        <ul className="ulNav">
          <li className="liLogo">
            <img className="logo" src={logo}alt="logo"/>
          </li>
          <li className="liNav">
            <Link className="home" to="/">Home</Link>
          </li>
          <li className="liNav">
            <Link className="login" to="/login">Login</Link>
          </li>
          <li className="liNav">
            <Link className="contacts" to="/contacts">Contacts</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;