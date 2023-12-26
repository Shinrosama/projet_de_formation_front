import { Link, useNavigate } from "react-router-dom";
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
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/admin">Dashboard</Link>
          </li>
          <li>
            <Link to="/admin/mangas">Gérer les mangas</Link>
          </li>
          <li>
            <Link to="/admin/mangas/create">Créer un manga</Link>
          </li>
          <li>
            <Link to="/admin/mangas/update/:id">modifier un manga</Link>
          </li>

        </ul>
        <button onClick={handleLogout}>Se déconnecter</button>
      </nav>
    </header>
  );
};

export default HeaderAdmin;