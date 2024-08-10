import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import "../styles/customPlaylist.css";
import SideBar from "./SideBar";
import Card from "./Card";
import { useAuth } from "../contexts/AuthContext";
import useTheme from "../hooks/useTheme";

function Playlist() {
    const { theme } = useTheme();
    const { token } = useAuth("state");
    const location = useLocation();
    const { playlistID } = location.state;
    const [songs, setSongs] = useState([]);
    const [entries, setEntries] = useState([]);
    const navigate = useNavigate();

    const [{ data: playlistData, isError: playlistError, isLoading: playlistLoading }, doFetchPlaylist] = useFetch(`https://sandbox.academiadevelopers.com/harmonyhub/playlists/${playlistID}/`, {});

    useEffect(() => {
        if (playlistID) {
            doFetchPlaylist();
        }
    }, [playlistID]);

    useEffect(() => {
        if (playlistData) {
            const fetchSongs = async () => {
                try {
                    const songPromises = playlistData.entries.map(songId => 
                        fetch(`https://sandbox.academiadevelopers.com/harmonyhub/songs/${songId}/`)
                            .then(response => response.json())
                    );
                    const songData = await Promise.all(songPromises);
                    setSongs(songData);
                    
                    const entryResponse = await fetch(`https://sandbox.academiadevelopers.com/harmonyhub/playlist-entries/?playlist=${playlistID}`);
                    const entryData = await entryResponse.json();
                    setEntries(entryData.results);
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            };
            fetchSongs();
        }
    }, [playlistData, playlistID]);

    const fetchEntryID = async (playlistID, songID) => {
        try {
            const response = await fetch(`https://sandbox.academiadevelopers.com/harmonyhub/playlist-entries/?playlist=${playlistID}`);
            if (!response.ok) throw new Error('Error fetching playlist entries');
            const data = await response.json();
            const entry = data.results.find(entry => entry.song === songID);
            if (!entry) throw new Error('Entry not found');
            return entry.id;
        } catch (error) {
            console.error('Error fetching entry ID:', error);
            throw error;
        }
    };

    const handleAddSong = () => {
        navigate("/addSong", { state: { playlistID }});
    };

    const handleBack = () => {
        navigate("/");
    }

    const handleRemoveSong = async (songID) => {
        if (!playlistID) {
            console.error('No se encontró PlaylistID.');
            return;
        }
        try {
            const entryID = await fetchEntryID(playlistID, songID);
            const response = await fetch(`https://sandbox.academiadevelopers.com/harmonyhub/playlist-entries/${entryID}/`, 
                {
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${token}`,
                    },
                }
            );
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error response:', errorText);
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            
            setEntries(entries.filter(entry => entry.id !== entryID));
            setSongs(songs.filter(song => song.id !== songID));
        } catch (error) {
            console.error('Error al eliminar entry', error);
        }
    };
    
    if (playlistLoading) return <h1>Cargando...</h1>;
    if (playlistError) return <h1>Error al traer la playlist</h1>;
    if (!playlistData) return <h1>No hay datos de la playlist disponibles</h1>;

    return (
        <div className="columns">
            <div className="column is-narrow sidebar-column">
                <SideBar />
            </div>
            <div className="box2">
            <div className={`column playlist-container ${
                theme === 'pink'
                ? 'pinkBackground'
                : 'blueBackground'
            }`}>
                <button className="button is-link mt-5" onClick={handleAddSong}>Agregar canción</button>
                <h1 className="title">Canciones de {playlistData.name}</h1>
                <div className="columns is-multiline">
                    {songs.length > 0 ? (
                        songs.map((song) => (
                            <div className="column is-one-quarter" key={song.id} style={{ display:"grid"}}>
                                <span className="remove" onClick={() => handleRemoveSong(song.id)}
                                     style={{width:"inherit", margin:"auto"}}

                                    >X</span>
                                <Card song={song}/>
                            </div>
                        ))
                    ) : (
                        <p className="parrafo">No hay canciones disponibles.</p>
                    )}
                </div>
                <button className="button is-primary mt-5" onClick={handleBack}>Volver</button>
            </div>
            </div>
        </div>
    );
}

export default Playlist;
