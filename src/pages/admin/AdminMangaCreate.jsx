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
    // je créé un objet "FormData" => ça me permet d'envoyer à mon api à la fois des infos JSON (text, number etc) et des fichiers
    const formData = new FormData();

    // dans mon formdata, je créé un champs title, qui contient le nom issu du champs "title", transformé en json
       formData.append("title", title)
       formData.append("authors", authors)
       formData.append("genres", genres)
       formData.append("synopsis", synopsis)

    // dans mon formData, je créé un champs file, qui contient le fichier issu du champs image
    formData.append("image", event.target.image.files[0]);

    const token = localStorage.getItem("jwt");

    const createMangaResponse = await fetch("http://localhost:3005/api/mangas/withImg", {
      method: "POST",
      headers: {
        // vu que j'envoie un formData (car j'ai des fichiers)
        // le contenu du body n'est plus du JSON pur donc je commente la ligne
        // "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      // j'envoie mon formData en body
      body: formData,
    });
    console.log()

    if (createMangaResponse.status === 201) {
      setMessage("Manga créé !");
    } else {
      setMessage("Erreur !");
    }
  };

  return (
    <>
      <HeaderAdmin />
      <main className="mainManga1">
          {message && <p>{message}</p>}
          <form className="formBloc1" onSubmit={handleCreateManga}>
            <div>
              <label className="titleLab1">
                Titre
                <input className="titleIn" type="text" name="title" />
              </label>
            </div>
            <div>
              <label className="authorsLab1">
                Auteurs
                <input className="authorsIn" type="text" name="authors" />
              </label>
            </div>
            <div>
              <label className="genresLab1">
                Genres
                <input className="genresIn" type="text" name="genres" />
              </label>
            </div>
            <div>
              <label className="synopsisLab1">
                Synopsis
                <input className="synopsisIn" type="text" name="synopsis" />
              </label>
            </div>
            <div>
              <label className="imageLab1">
                Image
                <input className="imageIn" type="file" name="image" />
              </label>
            </div>

            <input className="submitBtn" type="submit" />
          </form>
      </main>
    </>
  );
};

export default AdminMangaCreate;