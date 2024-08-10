import Tabs from "./Tabs";
import SideBar from "../components/SideBar";
import { useState, useEffect } from "react";
import imgDefault from "../components/imgs/AT.jpeg";
import useTheme from "../hooks/useTheme";

export default function Albums() {
    const { theme } = useTheme();
  const [showPlaylistForm, setShowPlaylistForm] = useState(false);
  const [isModifyingPlaylist, setIsModifyingPlaylist] = useState(false);
  const [playlistUpdated, setPlaylistUpdated] = useState(false);
  const [page, setPage] = useState(1);
  const [albums, setAlbums] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);

  const handlePlaylistCreate = (showForm) => {
    setShowPlaylistForm(showForm);
  };

  const handleModifyPlaylist = () => {
    setIsModifyingPlaylist(true);
  }
  const fetchAlbums = async (pageNumber) => {
    setIsLoading(true);
    setIsError(false);
    try {
        const response = await fetch(
            `http://sandbox.academiadevelopers.com/harmonyhub/albums/?page=${pageNumber}&page_size=4`
        );
        if (!response.ok) {
            throw new Error("No se pudieron cargar los álbumes");
        }
        const data = await response.json();
        setAlbums(data.results || []);
        setHasNextPage(!!data.next);
    } catch (error) {
        setIsError(true);
    } finally {
        setIsLoading(false);
    }
};

    useEffect(() => {
        fetchAlbums(page);
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
        theme === 'pink'
       ? 'pinkBackground'
        : 'blueBackground'
    }`}>
        <Tabs/>
    </div>
        <div className="columns">
                <div className="column is-narrow">
                     <SideBar
                        onPlaylistCreate={handlePlaylistCreate}
                        onModifyingPlaylist={handleModifyPlaylist}
                        setPlaylistUpdated={setPlaylistUpdated}  
                    /> 
                </div>
                <div className={`main-content ${
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
                        <h2 className="title">Álbumes</h2>
                        <div className="columns">
                            {albums.map((album) => (
                                  <div key={album.id} className="column is-one-quarter">
                                      <div className="card">
                                          <div className="card-image">
                                              <figure className="image is-4by3">
                                                  <img
                                                      src={album.cover || imgDefault}
                                                      alt={album.title}
                                                  />
                                              </figure>
                                          </div>
                                          <div className="card-content">
                                              <p className="title is-4">{album.title}</p>
                                              <p className="subtitle is-6">{album.year}</p>
                                          </div>
                                      </div>
                                  </div>
                              ))}
                          </div>
                          {isLoading && <p>Cargando más álbumes...</p>}
                          {isError && <p>Error al cargar los álbumes.</p>}
                          
                          <div className="buttons">
                              <button
                                  className="button is-link"
                                  onClick={handlePrevPage}
                                  disabled={page === 1}
                              >
                                  Prev
                              </button>
                              <button
                                  className="button is-link"
                                  onClick={handleNextPage}
                                  disabled={!hasNextPage}
                              >
                                  Next
                              </button>
                          </div>
                      </div>
                        </div>
                      </div>
                    </div>    
    
    </>
    
  );
}
