import { Link } from "react-router-dom";
import logo from '../../assets/images/logo.jpg';
import './footer.scss';
const Footer = () => {
    return (

        <footer className="footer">
            <div className="ulBloc">
                <ul>
                    <li className="liLogo">
                        <Link className="home" to="/"><img className="logofoot" src={logo}alt="logo"/></Link>
                    </li>
                </ul>
                <p className="copy">&copy;</p>
            </div>

        </footer>
    )
}

export default Footer