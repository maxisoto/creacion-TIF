import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import SelectedSong from "./SelectedSong";
import SideBar from "./SideBar";
import useTheme from "../hooks/useTheme";

function AddSong() {
    const { theme } = useTheme();
    const { token } = useAuth("state");
    const location = useLocation();
    const navigate = useNavigate();
    const playlistID = location.state?.playlistID || '';
    const [title, setTitle] = useState("");
    const [songFile, setSongFile] = useState(null);
    const [albums, setAlbums] = useState([]);
    const [selectedArtist, setSelectedArtist] = useState("");
    const [selectedAlbum, setSelectedAlbum] = useState("");
    const [isLoadingAlbum, setIsLoadingAlbum] = useState(false);
    const [isErrorAlbum, setIsErrorAlbum] = useState(false);
    const [selectedSongID, setSelectedSongID] = useState(null);

    // Para el combobox de albums
    const fetchAllAlbums = async (url) => {
        setIsLoadingAlbum(true);
        setIsErrorAlbum(false);
        try {
            let allAlbums = [];
            let nextUrl = url;

            while (nextUrl) {
                const response = await fetch(nextUrl);
                if (!response.ok) throw new Error('Error del servidor...');
                const data = await response.json();
                allAlbums = [...allAlbums, ...data.results];
                nextUrl = data.next;
            }
            setAlbums(allAlbums);
        } catch (error) {
            setIsErrorAlbum(true);
        } finally {
            setIsLoadingAlbum(false);
        }
    };

    useEffect(() => {
        fetchAllAlbums(`https://sandbox.academiadevelopers.com/harmonyhub/albums/`);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Creo nuevo canción
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('album', selectedAlbum);
            formData.append('song_file', songFile);

            const songResponse = await fetch('https://sandbox.academiadevelopers.com/harmonyhub/songs/', {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${token}`
                },
                body: formData
            });

            if (!songResponse.ok) throw new Error('La respuesta del server fue erronea');
            const songResult = await songResponse.json();
            console.log("ID song: ", songResult.file)
            console.log(songResult)

            // agrego la canción a la playlist
            const updateResponse = await fetch(`https://sandbox.academiadevelopers.com/harmonyhub/playlist-entries/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    order: 1,
                    playlist: playlistID,
                    song: songResult.id
                })
            });
            console.log("ID song: ", songResult.id)
            if (!updateResponse.ok) throw new Error('La respuesta del server fue erronea');
            navigate(`/customPlaylist`, { state: { playlistID } });
        } catch (error) {
            console.error('Error al agregar la canción:', error);
        }
    };

    // Agrego la canción a la playlist mendiante un click de una card.
    const handleSongSelect = async (songID) => {
        if (!playlistID) {
            console.error('No se encontro PlaylistID.');
            return;
        }
        setSelectedSongID(songID);        
        try {
            await fetch(`https://sandbox.academiadevelopers.com/harmonyhub/playlist-entries/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    order: 1,
                    playlist: playlistID,
                    song: songID
                })
            });
            navigate("/customPlaylist", { state: { playlistID }});
        } catch (error) {
            console.error('Error al agregar la canción a la playlist:', error);
        }
    };

    const handleBack = () => {
        navigate('/customPlaylist', { state: { playlistID } });
    };

    if (isLoadingAlbum) return <h1>Cargando...</h1>;
    if (isErrorAlbum) return <h1>Error loading albums</h1>;

    return (
        <div className="columns">
            <div className="column is-narrow">
                <SideBar />
            </div>
            <div className="column">
                <div className="box">
                    <SelectedSong onSelectSong={handleSongSelect} />
                </div>
                <form onSubmit={handleSubmit} className={`box ${
                    theme === 'blue'
                    ? 'pinkBackground'
                    : 'blueBackground'
                }`}>

<div className="field">
<p class="title is-3 is-spaced">Nueva Cancion ♫  </p>
  <label className="label">Titulo</label>
  <div className="control">
  <input
                            className="input"
                                type="text"
                                placeholder="Título de la canción"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                maxLength={150}
                                minLength={1}
    />
  </div>
</div>

<div className="field">
                        <label className="label">Álbum</label>
                        <div className="control">
                            <div className="select">
                                <select
                                    value={selectedAlbum}
                                    onChange={(e) => setSelectedAlbum(e.target.value)}
                                    required
                                >
                                    <option value="">Seleccione un álbum</option>
                                    {albums.length > 0 ? (
                                        albums.map((album) => (
                                            <option key={album.id} value={album.id}>
                                                {album.title}
                                            </option>
                                        ))
                                    ) : (
                                        <option value="" disabled>No hay albumes disponibles</option>
                                    )}
                                </select>
                            </div>
                        </div>
</div>

<div className="field">
    <label className="label">Subir Archivo de Cancion...</label>
        <div className="control">
            <input
                className="input"
                type="file"
                accept="audio/*"
                onChange={(e) =>{ 
                const file = e.target.files[0];
                console.log("Selected file:", file);
                setSongFile(file)
                }}
                required/>
        </div>
 </div>



<div className="field is-grouped">
  <div className="control">
    <button type="submit" className="button is-link">Agregar</button>
  </div>
  <div className="control">
  <button type="button" className="button is-link" onClick={handleBack}>Volver</button>
  </div>
</div>

    </form>
    </div>
</div>
    );
}

export default AddSong;
