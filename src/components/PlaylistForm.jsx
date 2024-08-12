import { useState } from "react";
import "../styles/playlistform.css";
import useFetch from "../hooks/useFetch";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import useTheme from "../hooks/useTheme";

function PlaylistForm() {
    const { theme } = useTheme();
    const { token } = useAuth("state");
    const [playlistName, setPlaylistName] = useState("");
    const [playlistDescription, setPlaylistDescription] = useState("");
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");

    const [{isError, isLoading }, doFetch] = useFetch('https://sandbox.academiadevelopers.com/harmonyhub/playlists/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify({
            name: playlistName,
            description: playlistDescription,
        }),
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await doFetch();
            setPlaylistName("");
            setPlaylistDescription("");
            navigate("/");
        } catch (error) {
            setErrorMessage(error.message || "Error al crear la playlist. Por favor, intente de nuevo.");
        }
    };

    const handleBack = () => {
        navigate("/");
    };

    return (
        <>
            <form onSubmit={handleSubmit} className={`${
                theme === 'pink'
                ? 'pinkBackground'
                : 'blueBackground'
            }`}>
                <div className="field">
                    <label className="label">Nombre de la Playlist</label>
                    <div className="control">
                        <input
                            className="input"
                            type="text"
                            placeholder="Nombre de la playlist"
                            value={playlistName}
                            onChange={(e) => setPlaylistName(e.target.value)}
                            required
                        />
                    </div>
                </div>
    
                <div className="field">
                    <label className="label">Descripción</label>
                    <div className="control">
                        <textarea
                            className="textarea"
                            placeholder="Descripción de la playlist"
                            value={playlistDescription}
                            onChange={(e) => setPlaylistDescription(e.target.value)}
                        ></textarea>
                    </div>
                </div>
    
                <div className="field">
                    <div className="control">
                        <button type="submit" className="button is-primary">
                            Crear Playlist
                        </button>
                    </div>
                    <div className="control m-4">
                        <button type="button" className="button is-primary" onClick={handleBack}>
                            Volver
                        </button>
                    </div>
                </div>
            </form>
            {errorMessage && <h1>{errorMessage}</h1>}
        </>
    );
}

export default PlaylistForm;
