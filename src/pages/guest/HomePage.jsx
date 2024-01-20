import React, { useEffect, useState } from "react";
import Header from "../../component/guest/Header";
import banner from "../../assets/images/images_manga/bannières/vagabondbanner.jpg"
import { Link } from "react-router-dom";
import './homePage.scss'
import Footer from "../../component/guest/Footer";


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
            <h1 className="bannerTitle">Mangas / Notes</h1>
            <img className="bannerImg" src={banner} alt="banière" />
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
                        
                        <div className="imgBloc1">
                          
                          <Link className="mangaLink" to={`/manga/details/${manga.id}`}><img className="mangaImg" src={manga.imageUrl} alt={manga.title}/></Link>
                        </div>
                        <Link className="mangaLink" to={`/manga/details/${manga.id}`}><div className="divLink">
                        Voir le manga
                        </div>
                        </Link>
                       
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