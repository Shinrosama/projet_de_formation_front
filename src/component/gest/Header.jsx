import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <h1>King of Mangas</h1>

      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/mangas">Mangas</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;