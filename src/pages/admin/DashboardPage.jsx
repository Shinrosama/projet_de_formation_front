import HeaderAdmin from "../../component/admin/HeaderAdmin";
import { useVerifyIfUserIsLogged } from "../../utils/security-utils";
import './dashboardPage.scss'

const DashboardPage = () => {
  useVerifyIfUserIsLogged();

  return (
    <main className="mainDash">
      <HeaderAdmin />
      <h2 className="titleDash">Vous êtes bien connecté en tant qu'admin</h2>
    </main>
  );
};

export default DashboardPage;