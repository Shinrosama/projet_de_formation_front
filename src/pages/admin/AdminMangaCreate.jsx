import { useState } from "react";
import HeaderAdmin from "../../component/admin/HeaderAdmin";
import { useVerifyIfUserIsLogged } from "../../utils/security-utils";
import './adminMangaCreate.scss'

const AdminMangaCreate = () => {
  useVerifyIfUserIsLogged();

  const [message, setMessage] = useState(null);

  const handleCreateManga = async (event) => {
    event.preventDefault();

    const title = event.target.title.value;
    const authors = event.target.authors.value;
    const genres = event.target.genres.value;
    const synopsis = event.target.synopsis.value;
   
  

    

    // const mangaToCreateJson = JSON.stringify(mangaToCreate);

    // je créé un objet "FormData" => ça me permet d'envoyer
    // à mon api à la fois des infos JSON (text, number etc)
    // et des fichiers
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

    const createMangaResponse = await fetch("http://localhost:3005/api/mangas/withImg", {
      method: "POST",
      headers: {
        // vu que j'envoie un formData (car j'ai des fichiers)
        // le contenu du body n'est plus du JSON pur
        // donc je commente la ligne
        // "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      // j'envoie mon formData en body
      body: formData,
    });

    if (createMangaResponse.status === 201) {
      setMessage("Manga créé !");
    } else {
      setMessage("Erreur !");
    }
  };

  return (
    <>
      <HeaderAdmin />
      {message && <p>{message}</p>}
      <form onSubmit={handleCreateManga}>
        <div>
          <label>
            Titre
            <input type="text" name="title" />
          </label>
        </div>
        <div>
          <label>
            Auteurs
            <input type="text" name="authors" />
          </label>
        </div>
        <div>
          <label>
            Genres
            <input type="text" name="genres" />
          </label>
        </div>
        <div>
          <label>
            Synopsis
            <input type="text" name="synopsys" />
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
    </>
  );
};

export default AdminMangaCreate;