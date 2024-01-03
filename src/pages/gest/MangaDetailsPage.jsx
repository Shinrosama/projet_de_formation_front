import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../../component/gest/Header";
import Footer from "../../component/gest/Footer";
import './mangaDetailsPage.scss'
import { useVerifyIfUserIsLogged } from "../../utils/security-utils";

const MangaDetailsPage = () => {
  //un hokk créer sur mesure pour verifier si l'utilisateurest bien connecté
  useVerifyIfUserIsLogged();

  //on reprend l'id via le paramètre dans l'url
  const { id } = useParams();

  //on veux gérer les états du composant et pouvoir les stocker lors du rechargement
  const [manga, setManga] = useState(null);
  const [reviews, setReviews] = useState(null);

  // on veux recuperer le token via la jwt
  const token = localStorage.getItem("jwt");
  
// je veux récupérer le manga via l'url plus le paramètre qui est son id
  useEffect(() => {
    (async () => {
      const mangaResponse = await fetch("http://localhost:3005/api/mangas/" + id);
      const mangaResponseData = await mangaResponse.json();

      setManga(mangaResponseData.data);
    })();
  }, [id]);

//je récupère les reviews via le fetch
  useEffect(() => {
    (async () => {
      const reviewsReponse = await fetch("http://localhost:3005/api/reviews")
      const reviewsData = await reviewsReponse.json();
      
      setReviews(reviewsData)
    })();
  }, []);




   // je créé une fonction, qui récupère un  id de manga et qui va créer sur l'api une review
   const handleCreateReview = async (event, mangaId) => {
    event.preventDefault();
  
    // je récupère les valeurs du formulaire
    const content = event.target.content.value;
    const rating = event.target.rating.value;
    
    // je créé un objet avec les valeurs du formulaire
    const reviewToCreate = {
      content: content,
      rating: rating,
    // + l'id du manga passé en parametre
      MangaId: mangaId,
    };
    console.log(reviewToCreate)
    
    // je transforme en JSON mon objet
    const reviewToCreateJson = JSON.stringify(reviewToCreate);

    // je fais mon appel fetch sur la création d'une review
    
    

    try {
      const reviewResponse = await fetch("http://localhost:3005/api/reviews" , {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
    // en passant le token en authorization        
        Authorization: "Bearer " + token,
      },
    // et le json avec les données du form (et l'id du manga)      
      body: reviewToCreateJson,
      
    });
    console.log(reviewToCreate)
    //on teste la réponse via un boolen si réponse ou si pas de réponse via le .ok
    if (reviewResponse.ok) {
    //la fonction alert permet de comuniquer un résultat 
      alert("Commentaire créé.");
      
      window.location.reload();
    } else {
      alert("Le commentaire n'as pus être créé. Veuillez réessayer. ");
    }

  } catch (error) {
    alert("Une erreur est survenue. Veullez réessayer");
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
                    <ul className="ulInfo">
                      <li>Auteurs : {manga.authors} e</li>
                      <li>Genres : {manga.genres} e</li>
                    </ul>
                    <div className="globalNote">

                    </div>
                </div>
              </div>
              <p className="synopsysBloc">
                Synopsis : {manga.synopsys}
              </p>
              <div>
                <p>Donnez vorte avis.</p>
              </div>

              <div className="reviewsBloc"> 
              {reviews ? (
                <div>
                
                  {reviews
                    
                    .filter((review) => review.MangaId === manga.id)
                    .map((review) => (
                      <article className="reviewContent" key={review.id}>
                        <p>Utilisateur : {review.User.username}</p>
                        <p>Commentaire : {review.content}</p>
                        <p>Note : {review.rating}</p>
                      </article>
                    ))}
              
                </div>
              ) : (
                <p>En cours de chargement</p>
              )}
               {/* 
                je créé un form pour chaque manga 
                et au submit j'appelle la fonction handleCreateReview
                en lui passant l'id du manga actuel
                */}
                
                <form onSubmit={(event) => handleCreateReview(event, manga.id)}>
                  <label>
                    Note
                    <input type="number" name="rating" />
                  </label>
                  <label>
                    Commentaire
                    <textarea className="ComentArea" type="text" name="content" />
                  </label>

                  <input className="submitBtn" type="submit" />
                </form>
              </div>
              
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