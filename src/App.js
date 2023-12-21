import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/gest/HomePage";
import MangasPage from "./pages/gest/MangasPage";
import MangaDetailsPage from "./pages/gest/MangaDetailsPage";
import LoginPage from "./pages/gest/LoginPage";
import DashboardPage from "./pages/admin/DashboardPage";
import AdminMangasPage from "./pages/admin/AdminMangasPage";
import AdminMangaCreate from "./pages/admin/AdminMangaCreate";
import AdminMangaUpdate from "./pages/admin/AdminMangaUpdate";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/mangas" element={<MangasPage />} />
        <Route path="/manga/details/:id" element={<MangaDetailsPage />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/admin/" element={<DashboardPage />} />
        <Route path="/admin/mangas" element={<AdminMangasPage />} />
        <Route path="/admin/mangas/create" element={<AdminMangaCreate />} />
        <Route path="/admin/mangas/update/:id" element={<AdminMangaUpdate />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;