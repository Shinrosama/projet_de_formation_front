import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../../component/gest/Header";
import Footer from "../../component/gest/Footer";
import './mangaDetailsPage.scss'

const MangaDetailsPage = () => {
  const { id } = useParams();
  const [manga, setManga] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [totalRating, setTotalRating] = useState(0);
  const token = localStorage.getItem("jwt");

  useEffect(() => {
    (async () => {
      const mangaResponse = await fetch(`http://localhost:3005/api/mangas/${id}`);
      const mangaResponseData = await mangaResponse.json();
      setManga(mangaResponseData.data);
    })();
  }, [id]);

  useEffect(() => {
    (async () => {
      const reviewsResponse = await fetch("http://localhost:3005/api/reviews");
      const reviewsData = await reviewsResponse.json();
      
      setReviews(reviewsData);

      if (manga && manga.id && reviewsData) {
        const total = reviewsData
          .filter((review) => review.MangaId === manga.id)
          .reduce((sum, review) => sum + review.rating, 0);
  
        const averageRating = total / reviewsData.length;
        setTotalRating(averageRating);
      }
    })();
  }, [manga]);

  const handleCreateReview = async (event, mangaId) => {
    event.preventDefault();

    const content = event.target.content.value;
    const rating = event.target.rating.value;

    const reviewToCreate = {
      content: content,
      rating: rating,
      MangaId: mangaId,
    };

    const reviewToCreateJson = JSON.stringify(reviewToCreate);

    try {
      const reviewResponse = await fetch("http://localhost:3005/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: reviewToCreateJson,
      });

      if (reviewResponse.ok) {
        alert("Commentaire créé.");
        window.location.reload();
      } else {
        alert("Le commentaire n'a pas pu être créé. Veuillez vous connecter.");
      }
    } catch (error) {
      alert("Une erreur est survenue. Veuillez réessayer");
    }
  };

  return (
    <>
      <Header />

      {manga ? (
        <article className="article">
          <div className="allBloc">
            <div className="mangaDetailBloc">
              <div className="imgBloc">
                <img className="imgDetail" src={manga.imageUrl} alt={manga.title}/>
              </div>
              <div className="infoBloc">
                <h2 className="title">{manga.title}</h2>
                <div className="ulInfo">
                  <div>Auteurs : {manga.authors}</div>
                  <div>Genres : {manga.genres}</div>
                </div>
                <div className="globalNote">
                  <p>Note globale: {totalRating.toFixed(2)}</p>
                </div>
              </div>
            </div>
            <p className="synopsysBloc">
              Synopsis: {manga.synopsis}
            </p>
            <div>
              <p>Donnez votre avis.</p>
            </div>

            <div className="reviewsBloc"> 
              {reviews ? (
                <div>
                  {reviews
                    .filter((review) => review.MangaId === manga.id)
                    .map((review) => (
                      <article className="reviewContent" key={review.id}>
                        <p className="ratingCom">Note : {review.rating}</p>
                        <p className="userTitle">Utilisateur : {review.User.username}</p>
                        <p>Commentaire : {review.content}</p>
                      </article>
                    ))}
                </div>
              ) : (
                <p>En cours de chargement</p>
              )}

              <form className="formContainer" onSubmit={(event) => handleCreateReview(event, manga.id)}>
                <label className="noteBloc">
                  Note
                  <input className="note" type="number" min={0} max={5} name="rating" />
                  /5
                </label>
                <label className="commentBloc">
                  Commentaire
                  <textarea className="commentArea" type="text" name="content" />
                </label>
                <input className="submitBtn" type="submit" />
              </form>
            </div>
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
