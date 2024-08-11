import Tabs from "./Tabs";
import SideBar from "../components/SideBar";
import { useState, useEffect } from "react";
import imgDefault from "../components/imgs/fondo5.jpg";
import useTheme from "../hooks/useTheme";

export default function Artists() {
  const { theme } = useTheme();
  const [showPlaylistForm, setShowPlaylistForm] = useState(false);
  const [isModifyingPlaylist, setIsModifyingPlaylist] = useState(false);
  const [playlistUpdated, setPlaylistUpdated] = useState(false);
  const [page, setPage] = useState(1);
  const [artists, setArtists] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);

  const handlePlaylistCreate = (showForm) => {
    setShowPlaylistForm(showForm);
  };

  const handleModifyPlaylist = () => {
    setIsModifyingPlaylist(true);
  }
  const fetchArtists = async (pageNumber) => {
    setIsLoading(true);
    setIsError(false);
    try {
        const response = await fetch(
            `http://sandbox.academiadevelopers.com/harmonyhub/artists/?page=${pageNumber}&page_size=4`
        );
        if (!response.ok) {
            throw new Error("Error cargando los artistas...");
        }
        const data = await response.json();
        setArtists(data.results || []);
        setHasNextPage(!!data.next);
    } catch (error) {
        setIsError(true);
    } finally {
        setIsLoading(false);
    }
  };

  useEffect(() => {
      fetchArtists(page);
  }, [page]);

  const handleNextPage = () => {
      if (hasNextPage) {
          setPage((prevPage) => prevPage + 1);
      }
  };

  const handlePrevPage = () => {
      if (page > 1) {
          setPage((prevPage) => prevPage - 1);
      }
  };
  return (
    <>
            <div className={`containerT ${
                theme === 'blue'
                   ? 'pinkBackground'
                    : 'blueBackground'
            }`}>
                <Tabs />
            </div>

            <div className="columns">
                <div className="column is-narrow">
                    <SideBar
                        onPlaylistCreate={handlePlaylistCreate}
                        onModifyingPlaylist={handleModifyPlaylist}
                        setPlaylistUpdated={setPlaylistUpdated}
                    />
                </div>
                <div className={`column is-10 ${
                    theme === 'pink'
                    ? 'pinkBackground'
                    : 'blueBackground'
                }`}>
                    <div className="containerDos">
                        <div className={`box box2 ${
                            theme === 'pink'
                            ? 'pinkBackground'
                            : 'blueBackground'
                        }`}>
                            <h2 className="title">Artistas</h2>
                            <div className="columns">
                                {artists.map((artist) => (
                                    <div key={artist.id} className="column is-one-quarter">
                                        <div className="card">
                                            <div className="card-image">
                                                <figure className="image is-4by3">
                                                    <img
                                                        src={artist.image || imgDefault}
                                                        alt={artist.name}
                                                    />
                                                </figure>
                                            </div>
                                            <div className="card-content">
                                                <p className="title is-4">{artist.name}</p>
                                                { (artist.bio ?<p className="subtitle is-6">Biografia:<br /> {artist.bio}</p>
                                                : null)
                                                }
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {isLoading && <p>Cargando más artistas...</p>}
                            {isError && <p>Error al cargar los artistas.</p>}

                            <div className="buttons">
                                <button
                                    className="button is-link"
                                    onClick={handlePrevPage}
                                    disabled={page === 1}
                                >
                                   <span class="icon">
                                        <i class="fas fa-arrow-left"></i>
                                    </span>
                                </button>
                                <button
                                    className="button is-link"
                                    onClick={handleNextPage}
                                    disabled={!hasNextPage}
                                >
                                    <span class="icon">
                                        <i class="fas fa-arrow-right"></i>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    
  );
}
