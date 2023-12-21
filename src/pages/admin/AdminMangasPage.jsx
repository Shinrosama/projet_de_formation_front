import React, { useEffect, useState } from "react";
import HeaderAdmin from "../../component/admin/HeaderAdmin";
import { jwtDecode } from "jwt-decode";
import { useVerifyIfUserIsLogged } from "../../utils/security-utils";

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

  // je créé une fonction, qui récupère un  id de manga
  // et qui va créer sur l'api une review
  const handleCreateReview = async (event, mangaId) => {
    event.preventDefault();

    // je récupère les valeurs du formulaire
    const content = event.target.content.value;
    const rating = event.target.rating.value;

    // je créé un objet avec les valeurs du formulaire
    // + l'id du manga passé en parametre
    const reviewToCreate = {
      content: content,
      rating: rating,
      MangaId: mangaId,
    };

    // je transforme en JSON mon objet
    const reviewToCreateJson = JSON.stringify(reviewToCreate);

    // je fais mon appel fetch sur la création d'une review
    // en passant le token en authorization
    // et le le json avec les données du form (et l'id du manga)
    await fetch("http://localhost:3005/api/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: reviewToCreateJson,
    });
  };

  return (
    <>
      <HeaderAdmin />
      <h1>Liste des mangas : </h1>

      {mangas ? (
        <>
          {mangas.map((manga) => {
            return (
              <article>
                <h2>{manga.title}</h2>
                {decodedToken.data.role !== 3 && (
                  <button onClick={(event) => handleDeleteManga(event, manga.id)}>Supprimer</button>
                )}
                {/* 
                je créé un form pour chaque manga 
                et au submit j'appelle la fonction handleCreateReview
                en lui passant l'id du manga actuel
                */}
                <form onSubmit={(event) => handleCreateReview(event, manga.id)}>
                  <label>
                    Review: contenu
                    <input type="text" name="content" />
                  </label>

                  <label>
                    Review: note
                    <input type="number" name="rating" />
                  </label>

                  <input type="submit" />
                </form>
              </article>
            );
          })}
        </>
      ) : (
        <p>En cours de chargement</p>
      )}
    </>
  );
};

export default AdminMangasPage;