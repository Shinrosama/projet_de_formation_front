import React, { useEffect, useState } from "react";
import Header from "../../component/gest/Header";
import { Link } from "react-router-dom";
import './homePage.scss'


const HomePage = () => {
  const [mangas, setMangas] = useState(null);

  useEffect(() => {
    (async () => {
      const mangasResponse = await fetch("http://localhost:3005/api/mangas");

      const mangasResponseData = await mangasResponse.json();

      setMangas(mangasResponseData);
    })();
  }, []);

  return (
    <main className="main">
      <Header />
      <banner className="banner">
        <img src="./public/assets/images/vagabondbanner" alt="" />
      </banner>

      <h1>Liste des mangas</h1>

      {mangas ? (
        <>
          <section className="container">
              {mangas.map((manga) => {
                return (
                  <article className="mangaBloc">
                    <h2>{manga.title}</h2>
                    <div className="imgBloc">
                      <img className="mangaImg" src={manga.imageUrl} alt={manga.title}/>
                    </div>
                    <Link to={`/manga/details/${manga.id}`}>Voir le manga</Link>
                  </article>
                );
              })}
          </section>
        </>
      ) : (
        <p>En cours de chargement</p>
      )}
    </main>
  );
};

export default HomePage;