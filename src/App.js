import { BrowserRouter, Route, Routes } from "react-router-dom";
//les imports de la partie guest
import HomePage from "./pages/gest/HomePage";
import MangasPage from "./pages/gest/MangasPage";
import MangaDetailsPage from "./pages/gest/MangaDetailsPage";
import LoginPage from "./pages/gest/LoginPage";
import ContactsPage from "./pages/gest/ContactsPage";
//les imports de la partie admin
import DashboardPage from "./pages/admin/DashboardPage";
import AdminMangasPage from "./pages/admin/AdminMangasPage";
import AdminMangaCreate from "./pages/admin/AdminMangaCreate";
import AdminMangaUpdate from "./pages/admin/AdminMangaUpdate";
import RegisterPage from "./pages/gest/RegisterPage";
import AdminUserPage from "./pages/admin/AdminUserPage";




function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* routes coté guest */}
        <Route path="/" element={<HomePage />} />
        <Route path="/mangas" element={<MangasPage />} />
        <Route path="/manga/details/:id" element={<MangaDetailsPage />} />
        <Route path="/contacts" element={<ContactsPage />} />

        {/* le login sert aux guests et admins */}
        <Route path="/login" element={<LoginPage />} />
        {/* le register ne permet que la création du role édit */}
        <Route path="/register" element={<RegisterPage />} />

        {/* routes coté admin */}
        <Route path="/admin/" element={<DashboardPage />} />
        <Route path="/admin/mangas" element={<AdminMangasPage />} />
        <Route path="/admin/users" element= {<AdminUserPage />} />
        <Route path="/admin/mangas/create" element={<AdminMangaCreate />} />
        <Route path="/admin/mangas/update/:id" element={<AdminMangaUpdate />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;