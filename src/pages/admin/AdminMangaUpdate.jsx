import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HeaderAdmin from "../../component/admin/HeaderAdmin";
import { useVerifyIfUserIsLogged } from "../../utils/security-utils";
import './adminMangaUpdate.scss'


const AdminMangaUpdate = () => {
  useVerifyIfUserIsLogged();

  const { id } = useParams();
  const [manga, setManga] = useState(null);

  const [message, setMessage] = useState(null);

  useEffect(() => {
    (async () => {
      const mangaResponse = await fetch(`http://localhost:3005/api/mangas/${id}`);
      const mangaResponseData = await mangaResponse.json();

      setManga(mangaResponseData.data);
    })();
  }, [id]);

  const handleUpdateManga = async (event) => {
    event.preventDefault();

    const title = event.target.title.value
    const authors = event.target.authors.value
    const genres = event.target.genres.value
    const synopsis = event.target.synopsis.value
    
    
    const formData = new FormData();

    // dans mon formdata, je créé un champs name, qui contient
    // le nom issu du champs "name", transformé en json
       formData.append("title", title)
       formData.append("authors", authors)
       formData.append("genres", genres)
       formData.append("synopsis", synopsis)
    // formData.append("name", JSON.stringify(name));
    // formData.append("price", JSON.stringify(price));
    
    // dans mon formData, je créé un champs file, qui contient
    // le fichier issu du champs image
    formData.append("image", event.target.image.files[0]);
   

    

    const token = localStorage.getItem("jwt");

    const updateMangaResponse = await fetch(`http://localhost:3005/api/mangas/withImg/${id}`, {
      method: "PUT",
      headers: {
        
        Authorization: "Bearer " + token,
      },
      body: formData,
    });

    if (updateMangaResponse.status === 201) {
      setMessage("Mise à jour OK");
    } else {
      setMessage("Erreur");
    }
  };

  return (
    <>
      <HeaderAdmin />
      <div>
        <>{message && <p>{message}</p>}</>
        {manga && (
          <form onSubmit={handleUpdateManga}>
            <div>
          <label>
            Titre
            <input type="text" name="title" defaultValue={manga.title}/>
          </label>
        </div>
        <div>
          <label>
            Auteurs
            <input type="text" name="authors" defaultValue={manga.authors}/>
          </label>
        </div>
        <div>
          <label>
            Genres
            <input type="text" name="genres" defaultValue={manga.genres}/>
          </label>
        </div>
        <div>
          <label>
            Synopsis
            <input type="text" name="synopsis" defaultValue={manga.synopsis}/>
          </label>
        </div>
        <div>
          <label>
            Image
            <input type="file" name="image" />
          </label>
        </div>
            <input type="submit" />
          </form>
        )}
      </div>
    </>
  );
};

export default AdminMangaUpdate;