import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HeaderAdmin from "../../component/admin/HeaderAdmin";
import { useVerifyIfUserIsLogged } from "../../utils/security-utils";

const AdminMangaUpdate = () => {
  useVerifyIfUserIsLogged();

  const { id } = useParams();
  const [manga, setManga] = useState(null);

  const [message, setMessage] = useState(null);

  useEffect(() => {
    (async () => {
      const mangaResponse = await fetch("http://localhost:3005/api/mangas/" + id);
      const mangaResponseData = await mangaResponse.json();

      setManga(mangaResponseData.data);
    })();
  }, [id]);

  const handleUpdateManga = async (event) => {
    event.preventDefault();

    const title = event.target.title.value;
    const authors = event.target.authors.value;
    const genres = event.target.genres.value;
    const synopsys = event.target.synopsys.value;
    

    const mangaUpdateData = {
      title: title,
      authors: authors,
      genres: genres,
      synopsys: synopsys
    };

    const mangaUpdateDataJson = JSON.stringify(mangaUpdateData);

    const token = localStorage.getItem("jwt");

    const updateMangaResponse = await fetch("http://localhost:3005/api/mangas/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: mangaUpdateDataJson,
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
                <input type="text" name="title" defaultValue={manga.title} />
              </label>
            </div>
            <div>
              <label>
                Auteurs
                <input type="text" name="priceByMonth" defaultValue={manga.price.month} />
              </label>
            </div>
            <div>
              <label>
                Genres
                <input type="text" name="genres" defaultValue={manga.genres} />
              </label>
            </div>
            <div>
              <label>
                Synopsis
                <input type="text" name="synopsys" defaultValue={manga.synopsys} />
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