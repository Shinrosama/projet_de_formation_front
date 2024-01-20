import { BrowserRouter, Route, Routes } from "react-router-dom";
//les imports de la partie guest
import HomePage from "./pages/guest/HomePage";
import MangaDetailsPage from "./pages/guest/MangaDetailsPage";
import LoginPage from "./pages/guest/LoginPage";
import ContactsPage from "./pages/guest/ContactsPage";
//les imports de la partie admin
import DashboardPage from "./pages/admin/DashboardPage";
import AdminMangasPage from "./pages/admin/AdminMangasPage";
import AdminMangaCreate from "./pages/admin/AdminMangaCreate";
import AdminMangaUpdate from "./pages/admin/AdminMangaUpdate";
import RegisterPage from "./pages/guest/RegisterPage";
import AdminUserPage from "./pages/admin/AdminUserPage";
import UserPage from "./pages/guest/UserPage";




function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* routes coté guest */}
        <Route path="/" element={<HomePage />} />
        <Route path="/manga/details/:id" element={<MangaDetailsPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/user" element={<UserPage />} />

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