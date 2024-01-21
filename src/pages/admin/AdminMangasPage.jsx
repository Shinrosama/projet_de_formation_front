import React, { useEffect, useState } from "react";
import HeaderAdmin from "../../component/admin/HeaderAdmin";
import { jwtDecode } from "jwt-decode";
import { useVerifyIfUserIsLogged } from "../../utils/security-utils";
import { Link } from "react-router-dom";
import './adminMangasPage.scss'

const AdminMangasPage = () => {
  useVerifyIfUserIsLogged();

  const [mangas, setMangas] = useState(null);
  const token = localStorage.getItem("jwt");
  const decodedToken = jwtDecode(token);

  useEffect(() => {
    (async () => {
      const mangasResponse = await fetch("http://localhost:3005/api/mangas");
      const mangasResponseData = await mangasResponse.json();
      setMangas(mangasResponseData);
    })();
  }, []);

  const handleDeleteManga = async (event, mangaId) => {
    await fetch("http://localhost:3005/api/mangas/" + mangaId, {
      method: "DELETE",
      headers: { Authorization: "Bearer " + token },
    });

    const mangasResponse = await fetch("http://localhost:3005/api/mangas");
    const mangasResponseData = await mangasResponse.json();
    setMangas(mangasResponseData);
  };

  return (
    <> 
    <HeaderAdmin />
      <main className="mainggPage">
        <h1>Liste des mangas : </h1>
        {mangas ? (
          <>
            {mangas.map((manga) => {
              return (
                <article className="articleBloc">
                  <h2 className="mangaTitle1">{manga.title}</h2>
                  {decodedToken.data.role !== 3 && (
                    <button className="deleteBtn" onClick={(event) => handleDeleteManga(event, manga.id)}>Supprimer</button>
                  )}
                  <Link to={`/admin/mangas/update/${manga.id}`} ><button className="updateBtn" >Modifier manga</button></Link>
                </article>
              );
            })}
          </>
        ) : (
          <p>En cours de chargement</p>
        )}
    </main>
    </>
  );
};

export default AdminMangasPage;