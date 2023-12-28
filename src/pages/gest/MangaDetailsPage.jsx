import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../../component/gest/Header";
import Footer from "../../component/gest/Footer";
import './mangaDetailsPage.scss'
import LoginReviews from "../../component/gest/LoginReviews";

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
          <div className="allBloc">
              <div className="mangaDetailBloc">
                <div className="imgBloc">
                    <img className="imgDetail" src={manga.data.imageUrl} alt={manga.data.title}/>
                </div>
                <div className="infoBloc">
                    <h2 className="title">{manga.data.title}</h2>
                    <ul className="ulInfo">
                      <li>Auteurs : {manga.data.authors} e</li>
                      <li>Genres : {manga.data.genres} e</li>
                    </ul>
                    <div className="globalNote">

                    </div>
                </div>
            </div>
            
              <p className="synopsysBloc">
                Synopsis : {manga.data.synopsys}
              </p>
           
            <LoginReviews/> 
          </div>
        
            
        </article>
      ) : (
        <p>En cours de chargement</p>
      )}

      <Footer/>
    </>
  );
};

export default MangaDetailsPage;