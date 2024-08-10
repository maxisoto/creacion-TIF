import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/modifyPlaylist.css";

function ModifyPlaylist() {
    const location = useLocation();
    const userPlaylists = location.state?.userPlaylists || [];

    const [page, setPage] = useState(1);
    const [paginatedPlaylists, setPaginatedPlaylists] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const itemsXPage = 8;
    const totalPages = userPlaylists.length > 0 ? Math.ceil(userPlaylists.length / itemsXPage) : 0;

    useEffect(() => {
        const fetchPlaylists = async () => {
            setIsLoading(true);
            const startIndex = (page - 1) * itemsXPage;
            const endIndex = startIndex + itemsXPage;
            setPaginatedPlaylists(userPlaylists.slice(startIndex, endIndex));
            setIsLoading(false);
        };

        fetchPlaylists();
    }, [page, userPlaylists]);

    const handleNextPage = () => {
        if (page < totalPages) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (page > 1) {
            setPage((prevPage) => prevPage - 1);
        }
    };

    const handleClick = (playlist) => {
        navigate("/modForm", { state: { playlist } });
    };

    return (
        <div className="container modify-playlist-container">
            <h1 className="title modify-playlist-title">Modificar Playlists</h1>
            {isLoading ? (
                <p>Cargando playlists...</p>
            ) : (
                <div className="columns is-multiline" >
                    {paginatedPlaylists.length > 0 ? (
                        paginatedPlaylists.map((playlist) => (
                            <div className="column is-one-quarter" key={playlist.id} >
                                <div className="card modify-playlist-card" onClick={() => handleClick(playlist)}>
                                    <div className="card-content">
                                        <p className="title modify-playlist-title">{playlist.name}</p>
                                        <p className="subtitle">{playlist.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No hay playlists disponibles.</p>
                    )}
                </div>
            )}
            <div className="buttons is-centered">
                <button
                    className="button is-link"
                    onClick={handlePrevPage}
                    disabled={page === 1}
                >
                    Anterior
                </button>
                <button
                    className="button is-link"
                    onClick={handleNextPage}
                    disabled={page === totalPages || totalPages === 0}
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
}

export default ModifyPlaylist;
