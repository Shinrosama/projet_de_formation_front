import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../../component/gest/Header";
import Footer from "../../component/gest/Footer";
import './mangaDetailsPage.scss'
import LoginReviews from "../../component/gest/LoginReviews";
import { jwtDecode } from "jwt-decode";

const MangaDetailsPage = () => {

  const { id } = useParams();

  const [manga, setManga] = useState(null);
  const token = localStorage.getItem("jwt");
  

  useEffect(() => {
    (async () => {
      const mangaResponse = await fetch("http://localhost:3005/api/mangas/" + id);
      const mangaResponseData = await mangaResponse.json();

      setManga(mangaResponseData);
    })();
  }, [id]);

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
              <form onSubmit={(event) => handleCreateReview(event, manga.id)}>
                  <label>
                    
                  <label>
                    Review: note
                    <input type="number" name="rating" />
                  </label>
                    Review: contenu
                    <input type="text" name="content" />
                  </label>

                  <input type="submit" />
                </form>
            {/* <LoginReviews/>  */}
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