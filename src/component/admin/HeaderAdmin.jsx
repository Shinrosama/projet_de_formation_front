import { Link, useNavigate } from "react-router-dom";
import logo from '../../assets/images/logo.jpg';
import './headerAdmin.scss'

const HeaderAdmin = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // sortir le token du local storage
    localStorage.removeItem("jwt");

    // redirige l'utilisateur vers la page de login
    navigate("/login");
  };

  return (
    <header className="adminHeader">
      <nav className="adminNav">
        <ul className="headerAdminUl">
        <li className="liLogo">
              <Link className="homelogo" to="/"><img className="logo" src={logo}alt="logo"/></Link>
          </li>
          <li className="dashLi">
            <Link to="/admin">Dashboard</Link>
          </li>
          <li className="mangasLi">
            <Link to="/admin/mangas">Gérer les mangas</Link>
          </li>
          <li className="usersLi">
            <Link to="/admin/users">Gérer les utilisateurs</Link>
          </li>
          <li className="createLi">
            <Link to="/admin/mangas/create">Créer un manga</Link>
          </li>
          <li className="updateLi">
            <Link to="/admin/mangas/update/:id">modifier un manga</Link>
          </li>


        </ul>
        <button className="adminLogout" onClick={handleLogout}>Se déconnecter</button>
      </nav>
    </header>
  );
};

export default HeaderAdmin;