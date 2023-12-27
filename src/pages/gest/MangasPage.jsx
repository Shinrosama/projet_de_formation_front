import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../component/gest/Header";
import './mangasPage.scss'

const MangasPage = () => {
  const [mangas, setMangas] = useState(null);

  useEffect(() => {
    (async () => {
      const mangasResponse = await fetch("http://localhost:3005/api/mangas");

      const mangasResponseData = await mangasResponse.json();

      setMangas(mangasResponseData);
    })();
  }, []);

  return (
    <>
      <Header />

      <h1>Liste des mangas : </h1>

      {mangas ? (
        <>
          {mangas.map((manga) => {
            return (
              <article>
                <h2>{manga.title}</h2>
                <img src={manga.imageUrl} alt={manga.title}/>
                <Link to={`/manga/details/${manga.id}`}>Voir le manga</Link>
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

export default MangasPage;