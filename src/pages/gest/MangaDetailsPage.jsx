import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../../component/gest/Header";
import Footer from "../../component/gest/Footer";
import './mangaDetailsPage.scss'

const MangaDetailsPage = () => {
  const { id } = useParams();

  const [manga, setManga] = useState(null);

  useEffect(() => {
    (async () => {
      const mangaResponse = await fetch("http://localhost:3005/api/mangas/" + id);
      const mangaResponseData = await mangaResponse.json();

      setManga(mangaResponseData);
    })();
  }, [id]);

  return (
    <>
      <Header />

      {manga ? (
        <article className="article">

          <div>
              <img className="imgDetail" src={manga.data.imageUrl} alt={manga.data.title}/>
          </div>
          <h2>{manga.data.title}</h2>
          <ul>
            <li>Auteurs : {manga.data.authors} e</li>
            <li>Genres : {manga.data.genres} e</li>
          </ul>
          <p>
            Synopsis : {manga.data.synopsys}
          </p>
         
        </article>
      ) : (
        <p>En cours de chargement</p>
      )}

      <Footer/>
    </>
  );
};

export default MangaDetailsPage;