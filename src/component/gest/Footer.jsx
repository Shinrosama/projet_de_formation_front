import { Link } from "react-router-dom";
import logo from '../../assets/images/logo.jpg';
import './footer.scss';
const Footer = () => {
    return (

        <footer className="footer">
            <div className="ulBloc">
                <ul>
                    <li className="liLogofoot">
                        <Link className="home" to="/"><img className="logofoot" src={logo}alt="logo"/></Link>
                    </li>
                </ul>
            </div>

        </footer>
    )

}

export default Footer