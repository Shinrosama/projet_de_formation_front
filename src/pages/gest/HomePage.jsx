import React, { useEffect, useState } from "react";
import Header from "../../component/gest/Header";
import banner from "../../assets/images/images_manga/bannières/vagabondbanner.jpg"
import { Link } from "react-router-dom";
import './homePage.scss'
import Footer from "../../component/gest/Footer";


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
      <>
      <Header />
        <main className="main">
          
          <div className="bannerBloc">
            <img className="bannerImg" src={banner} alt="banière" />
            <h1>Mangas / Notes</h1>
          </div>


          {mangas ? (
            <>
              <section className="container">
                  {mangas.map((manga) => {
                    return (
                      <article className="mangaBloc">
                        
                        <div className="divTitle">
                          <h2>{manga.title}</h2>
                        </div>
                        
                        <div className="imgBloc">
                          <img className="mangaImg" src={manga.imageUrl} alt={manga.title}/>
                        </div>
                        <div className="divLink">
                        <Link className="mangaLink" to={`/manga/details/${manga.id}`}>Voir le manga</Link>
                        </div>
                       
                      </article>
                    );
                  })}
              </section>
            </>
          ) : (
            <p>En cours de chargement</p>
          )}
        </main>
        <Footer/>
      </>
  );
};

export default HomePage;